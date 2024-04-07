import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Transaction } from '../transactions/entities/transaction.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  async create(createWalletDto: CreateWalletDto, userId: string) {
    const user = await this.userService.findById(userId);
    if (await this.findOneByName(createWalletDto.name, userId)) {
      throw new BadRequestException('Such wallet already exist.');
    }
    const wallet = this.walletRepository.create({ ...createWalletDto, user });
    return this.walletRepository.save(wallet);
  }

  async findAll(userId: string, page: number, limit: number) {
    const [results, total] = await this.walletRepository.findAndCount({
      where: { user: { id: userId } },
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      wallets: results,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findTransactionByWallet(
    walletId: string,
    userId: string,
    page: number,
    limit: number,
  ) {
    const wallet = await this.findById(walletId);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(userId, wallet.user.id);
    const [results, total] = await this.transactionRepository.findAndCount({
      where: { wallet: { id: walletId } },
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      transactions: results,
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
        const convertedBalance = await this.convertCurrency(wallet);
        return acc + convertedBalance;
      }
    }, Promise.resolve(0));

    return { totalBalance, currency: user.defaultCurrency };
  }

  private async convertCurrency(wallet: Wallet) {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://v6.exchangerate-api.com/v6/b7f880af6106d8d519f61d4f/pair/${wallet.currency}/${wallet.user.defaultCurrency}/${wallet.balance}`,
      ),
    );
    return response.data.conversion_result;
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
