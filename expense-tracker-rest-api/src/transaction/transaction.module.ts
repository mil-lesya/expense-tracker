import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Transaction } from './entity/transaction.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CategoryService } from '../category/category.service';
import { WalletService } from '../wallet/wallet.service';
import { CategoryModule } from '../category/category.module';
import { WalletModule } from '../wallet/wallet.module';
import { UserService } from '../user/user.service';
import { Category } from '../category/entity/category.entity';
import { User } from '../user/entity/user.entity';
import { Wallet } from '../wallet/entity/wallet.entity';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from '../currency/currency.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Category, Wallet, User]),
    UserModule,
    AuthModule,
    CategoryModule,
    WalletModule,
    HttpModule,
    NotificationModule,
  ],
  providers: [
    TransactionService,
    AuthService,
    CategoryService,
    WalletService,
    UserService,
    CurrencyService,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
