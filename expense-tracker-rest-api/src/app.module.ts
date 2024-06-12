import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/entity/wallet.entity';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { Category } from './category/entity/category.entity';
import { Transaction } from './transaction/entity/transaction.entity';
import { GoalModule } from './goal/goal.module';
import { Goal } from './goal/entity/goal.entity';
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
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    UserModule,
    AuthModule,
    WalletModule,
    CategoryModule,
    TransactionModule,
    GoalModule,
    BudgetModule,
    LimitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
