import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { WalletService } from '../wallets/wallet.service';
import { CategoryService } from '../categories/category.service';
import { TransactionResponseDto } from './interfaces/transaction.response.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoryService) {
  }

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const wallet = await this.walletService.findById(createTransactionDto.walletId);
    if (!wallet) throw new BadRequestException;
    this.authService.checkAuthorization(userId, wallet.user.id);

    const category = await this.categoryService.findById(createTransactionDto.categoryId);
    if (!wallet) throw new BadRequestException;
    if (category?.user) {
      this.authService.checkAuthorization(userId, category.user.id);
    }

    const date = new Date();

    const transaction = this.transactionRepository.create({ ...createTransactionDto, wallet, category, date });
    const createdTransaction = await this.transactionRepository.save(transaction);
    return this.getTransactionResponse(createdTransaction);
  }

  async findByUser(userId: string, page: number, limit: number) {
    const [results, total] = await this.transactionRepository.findAndCount({
      where: { wallet: { user: { id: userId } } },
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      transactions: results.map(transaction => this.getTransactionResponse(transaction)),
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
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

  async update(id: string, userId: string, updateTransactionDto: UpdateTransactionDto) {
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
      category = await this.categoryService.findById(updateTransactionDto.categoryId);
      if (category.user) {
        this.authService.checkAuthorization(userId, category.user.id);
      }
    }

    transaction.wallet = wallet || transaction.wallet;
    transaction.category = category || transaction.category;
    transaction.type = updateTransactionDto.type || transaction.type;
    transaction.date = updateTransactionDto.date || transaction.date;
    transaction.amount = updateTransactionDto.amount || transaction.amount;
    transaction.currency = updateTransactionDto.currency || transaction.currency;
    transaction.description = updateTransactionDto.description || transaction.description;

    return this.getTransactionResponse(await this.transactionRepository.save(transaction));
  }

  async remove(id: string, userId: string) {
    const transaction = await this.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const wallet = await this.walletService.findById(transaction.wallet.id);
    this.authService.checkAuthorization(userId, wallet.user.id);

    return this.getTransactionResponse(await this.transactionRepository.remove(transaction));
  }

  getTransactionResponse(transaction: Transaction): TransactionResponseDto {
    const { wallet, ...rest } = transaction;
    return { walletId: wallet.id, ...rest };
  }
}
