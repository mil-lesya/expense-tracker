import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from '../currency/currency.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    UserModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, AuthService, CurrencyService],
})
export class WalletModule {}
