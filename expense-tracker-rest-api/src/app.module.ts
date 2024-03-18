import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallets/wallet.module';
import { Wallet } from './wallets/entities/wallet.entity';
import { CategoryModule } from './categories/category.module';
import { TransactionModule } from './transactions/transaction.module';
import { Category } from './categories/entities/category.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { GoalModule } from './goal/goal.module';
import { Goal } from './goal/entities/goal.entity';
import { Budget } from './budget/entity/budget.entity';
import { Limit } from './limit/entity/limit.entity';
import { BudgetModule } from './budget/budget.module';
import { LimitModule } from './limit/limit.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Wallet, Category, Transaction, Goal, Budget, Limit],
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    }),
    UserModule,
    AuthModule,
    WalletModule,
    CategoryModule,
    TransactionModule,
    GoalModule,
    BudgetModule,
    LimitModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
