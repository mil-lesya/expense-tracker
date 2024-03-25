import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class WalletService {

  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private readonly userService: UserService,
    private readonly authService: AuthService) {
  }

  async create(createWalletDto: CreateWalletDto, userId: string) {
    const user = await this.userService.findById(userId);
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

  async findTransactionByWallet(walletId: string, userId: string, page: number, limit: number) {
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
