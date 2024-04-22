import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Any,
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { WalletService } from '../wallets/wallet.service';
import { CategoryService } from '../categories/category.service';
import { TransactionResponseDto } from './interfaces/transaction.response.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './enums/transaction-type.enum';
import { CurrencyCode } from '../currency/enums/currency-code.enum';
import { CurrencyService } from '../currency/currency.service';
import { UserService } from '../users/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoryService,
    private readonly currencyService: CurrencyService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const wallet = await this.walletService.findById(
      createTransactionDto.walletId,
    );
    if (!wallet) throw new BadRequestException();
    this.authService.checkAuthorization(userId, wallet.user.id);

    const category = await this.categoryService.findById(
      createTransactionDto.categoryId,
    );
    if (!category) throw new BadRequestException();
    if (category?.user) {
      this.authService.checkAuthorization(userId, category.user.id);
    }

    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      wallet,
      category,
    });
    const createdTransaction =
      await this.transactionRepository.save(transaction);

    let amount =
      transaction.currency === wallet.currency
        ? transaction.amount
        : await this.currencyService.getPairConversion(
            transaction.currency,
            wallet.currency,
            transaction.amount,
          );

    amount = transaction.type === TransactionType.expense ? -amount : amount;
    await this.walletService.updateBalance(wallet.id, amount);
    return this.getTransactionResponse(createdTransaction);
  }

  async findByUser(
    userId: string,
    page: number,
    limit: number,
    search: string,
    startDate?: Date,
    endDate?: Date,
    minAmount?: number,
    maxAmount?: number,
    currency?: string,
    type?: string,
    category?: string,
    wallet?: string,
    sort?: string,
    order?: 'ASC' | 'DESC',
  ) {
    const transactionTypes: TransactionType[] = type
      ?.split(',')
      .reduce((acc, s) => {
        const type = TransactionType[s as keyof typeof TransactionType];
        if (type) acc.push(type);
        return acc;
      }, [] as TransactionType[]);

    const currencyCodes: CurrencyCode[] = currency
      ?.split(',')
      .reduce((acc, s) => {
        const currency = CurrencyCode[s as keyof typeof CurrencyCode];
        if (currency) acc.push(currency);
        return acc;
      }, [] as CurrencyCode[]);

    const categories = category?.split(',');
    const wallets = wallet?.split(',');

    const whereCondition: FindOptionsWhere<Transaction> = {
      description: ILike(`%${search}%`),
      wallet: { user: { id: userId } },
      ...(type && { type: Any(transactionTypes) }),
      ...(currency && { currency: Any(currencyCodes) }),
      ...(category && { category: { id: Any(categories) } }),
      ...(wallet && { wallet: { id: Any(wallets), user: { id: userId } } }),
      ...(startDate && endDate && { date: Between(startDate, endDate) }),
      ...(startDate && !endDate && { date: MoreThanOrEqual(startDate) }),
      ...(!startDate && endDate && { date: LessThanOrEqual(endDate) }),
      ...(minAmount && maxAmount && { amount: Between(minAmount, maxAmount) }),
      ...(minAmount && !maxAmount && { amount: MoreThanOrEqual(minAmount) }),
      ...(!maxAmount && maxAmount && { amount: LessThanOrEqual(maxAmount) }),
    };

    const orderBy: FindOptionsOrder<Transaction> =
      sort === 'category' || sort === 'wallet'
        ? { [sort]: { name: order } }
        : sort
          ? { [sort]: order }
          : {};

    const [results, total] = await this.transactionRepository.findAndCount({
      where: whereCondition,
      order: orderBy,
      take: limit,
      skip: limit * (page - 1),
    });

    return {
      transactions: results.map((transaction) =>
        this.getTransactionResponse(transaction),
      ),
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getAnalyticData(
    userId: string,
    startDate: Date,
    endDate: Date,
    wallet?: string,
    category?: string,
    type?: string,
  ) {
    const user = await this.userService.findById(userId);

    const transactionTypes: TransactionType[] = type
      ?.split(',')
      .reduce((acc, s) => {
        const type = TransactionType[s as keyof typeof TransactionType];
        if (type) acc.push(type);
        return acc;
      }, [] as TransactionType[]);

    const categories = category?.split(',');
    const wallets = wallet?.split(',');

    const whereCondition: FindOptionsWhere<Transaction> = {
      wallet: { user: { id: userId } },
      ...(type && { type: Any(transactionTypes) }),
      ...(category && { category: { id: Any(categories) } }),
      ...(wallet && { wallet: { id: Any(wallets), user: { id: userId } } }),
      ...(startDate && endDate && { date: Between(startDate, endDate) }),
      ...(startDate && !endDate && { date: MoreThanOrEqual(startDate) }),
      ...(!startDate && endDate && { date: LessThanOrEqual(endDate) }),
    };

    const results = await this.transactionRepository.find({
      where: whereCondition,
    });

    const responsePromises = results.map(async (transaction) => {
      const amount =
        transaction.currency === user.defaultCurrency
          ? transaction.amount
          : await this.currencyService.getPairConversion(
              transaction.currency,
              user.defaultCurrency,
              transaction.amount,
            );
      return {
        category: transaction.category,
        amount: transaction.type === TransactionType.expense ? -amount : amount,
      };
    });

    const analytic = await Promise.all(responsePromises);

    const result = analytic.reduce(
      (acc, { category, amount }) => {
        const categoryId = category.id;
        if (!acc.categories[categoryId]) {
          acc.categories[categoryId] = { category, amount: 0 };
        }
        acc.categories[categoryId].amount += amount;
        acc.totalBalance += amount;
        return acc;
      },
      { categories: {}, totalBalance: 0 },
    );

    return {
      analytic: Object.values(result.categories),
      totalBalance: result.totalBalance,
      currency: user.defaultCurrency,
    };
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.getTransactionResponse(transaction);
  }

  private async findById(id: string) {
    return await this.transactionRepository.findOneBy({ id });
  }

  async update(
    id: string,
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    let wallet = null;
    if (updateTransactionDto.walletId) {
      wallet = await this.walletService.findById(updateTransactionDto.walletId);
      this.authService.checkAuthorization(userId, wallet.user.id);
    }

    let category = null;
    if (updateTransactionDto.categoryId) {
      category = await this.categoryService.findById(
        updateTransactionDto.categoryId,
      );
      if (category.user) {
        this.authService.checkAuthorization(userId, category.user.id);
      }
    }

    transaction.wallet = wallet || transaction.wallet;
    transaction.category = category || transaction.category;
    transaction.type = updateTransactionDto.type || transaction.type;
    transaction.date = updateTransactionDto.date || transaction.date;
    transaction.amount = updateTransactionDto.amount || transaction.amount;
    transaction.currency =
      updateTransactionDto.currency || transaction.currency;
    transaction.description =
      updateTransactionDto.description || transaction.description;

    return this.getTransactionResponse(
      await this.transactionRepository.save(transaction),
    );
  }

  async remove(id: string, userId: string) {
    const transaction = await this.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const wallet = await this.walletService.findById(transaction.wallet.id);
    this.authService.checkAuthorization(userId, wallet.user.id);

    return this.getTransactionResponse(
      await this.transactionRepository.remove(transaction),
    );
  }

  getTransactionResponse(transaction: Transaction): TransactionResponseDto {
    const { wallet, ...rest } = transaction;
    return { walletId: wallet.id, ...rest };
  }
}
