import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WalletsService {

  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    private readonly userService: UsersService,
    private readonly authService: AuthService) {
  }

  async create(createWalletDto: CreateWalletDto, userId: string) {
    const user = await this.userService.findById(userId);
    const wallet = this.walletRepository.create({ ...createWalletDto, user });
    return this.walletRepository.save(wallet);
  }

  findAll(userId: string) {
    return this.walletRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: string) {
    return this.walletRepository.findOneBy({ id });
  }

  async update(id: string, userId: string, attrs: Partial<Wallet>) {
    const wallet = await this.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(userId, wallet.user.id);
    Object.assign(wallet, attrs);
    const savedWallet = await this.walletRepository.save(wallet);
    const { user, ...walletResponse } = savedWallet;
    return walletResponse;
  }

  async remove(id: string, userId: string) {
    const wallet = await this.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(userId, wallet.user.id);
    const removedWallet = await this.walletRepository.save(wallet);
    const { user, ...walletResponse } = removedWallet;
    return walletResponse;
  }

}
