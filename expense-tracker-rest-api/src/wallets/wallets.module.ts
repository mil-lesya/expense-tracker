import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { UsersModule } from '../users/users.module';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    UsersModule,
    AuthModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService, AuthService]
})
export class WalletsModule {}
