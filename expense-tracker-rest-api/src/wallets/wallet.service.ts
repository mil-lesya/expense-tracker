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

  async create(createWalletDto: CreateWalletDto, userId: string): Promise<Wallet> {
    const user = await this.userService.findById(userId);
    const wallet = this.walletRepository.create({ ...createWalletDto, user });
    return this.walletRepository.save(wallet);
  }

  findAll(userId: string): Promise<Wallet[]> {
    return this.walletRepository.find({ where: { user: { id: userId } } });
  }
  async findTransactionByWallet(walletId: string, userId: string) {
    const wallet = await this.findById(walletId);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(userId, wallet.user.id);
    return this.transactionRepository.find({where: { wallet: {id: walletId}}})
  }

  findById(id: string): Promise<Wallet> {
    return this.walletRepository.findOneBy({ id });
  }

  async update(id: string, userId: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
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
    return this.walletRepository.save(wallet);
  }

}
