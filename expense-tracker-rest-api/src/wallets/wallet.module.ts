import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { UserModule } from '../users/user.module';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { Transaction } from '../transactions/entities/transaction.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, Transaction]),
    UserModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, AuthService],
})
export class WalletModule {}
