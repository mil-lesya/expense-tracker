import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly currencyService: CurrencyService,
  ) {}

  async updateBalance(walletId: string, amount: number) {
    const wallet = await this.findById(walletId);
    wallet.balance = wallet.balance + amount;
    await this.walletRepository.save(wallet);
  }

  async create(createWalletDto: CreateWalletDto, userId: string) {
    const user = await this.userService.findById(userId);
    if (await this.findOneByName(createWalletDto.name, userId)) {
      throw new BadRequestException('Such wallet already exist.');
    }
    const wallet = this.walletRepository.create({ ...createWalletDto, user });
    return this.walletRepository.save(wallet);
  }

  async findAll(userId: string, page?: number, limit?: number) {
    const where = { user: { id: userId } };

    const options: FindManyOptions = { where };

    if (limit != null && page != null) {
      options.take = limit;
      options.skip = limit * (page - 1);
    }

    const [results, total] = await this.walletRepository.findAndCount(options);
    return {
      wallets: results,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  findById(id: string) {
    return this.walletRepository.findOneBy({ id });
  }

  findOneByName(name: string, userId: string) {
    return this.walletRepository.findOneBy({ name, user: { id: userId } });
  }

  async getTotalBalance(userId: string) {
    const user = await this.userService.findById(userId);

    const wallets = await this.walletRepository.find({
      where: { user: user },
    });

    const totalBalance = await wallets.reduce(async (accPromise, wallet) => {
      const acc = await accPromise;
      if (wallet.currency === wallet.user.defaultCurrency) {
        return acc + wallet.balance;
      } else {
        const convertedBalance = await this.currencyService.getPairConversion(
          wallet.currency,
          wallet.user.defaultCurrency,
          wallet.balance,
        );
        return acc + convertedBalance;
      }
    }, Promise.resolve(0));

    return { totalBalance, currency: user.defaultCurrency };
  }

  async update(id: string, userId: string, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.findById(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(userId, wallet.user.id);
    Object.assign(wallet, updateWalletDto);
    return this.walletRepository.save(wallet);
  }

  async remove(id: string, userId: string) {
    const wallet = await this.findById(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(userId, wallet.user.id);
    return this.walletRepository.remove(wallet);
  }
}
