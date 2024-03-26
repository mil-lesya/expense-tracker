import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { Transaction } from './entities/transaction.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CategoryService } from '../categories/category.service';
import { WalletService } from '../wallets/wallet.service';
import { CategoryModule } from '../categories/category.module';
import { WalletModule } from '../wallets/wallet.module';
import { UserService } from '../users/user.service';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { Wallet } from '../wallets/entities/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Category, Wallet, User]),
    UserModule,
    AuthModule,
    CategoryModule,
    WalletModule,
  ],
  providers: [
    TransactionService,
    AuthService,
    CategoryService,
    WalletService,
    UserService,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
