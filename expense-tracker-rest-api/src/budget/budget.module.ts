import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entity/budget.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { Limit } from '../limit/entity/limit.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget, Limit]),
    UserModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [BudgetController],
  providers: [BudgetService, AuthService],
  exports: [BudgetService],
})
export class BudgetModule {}
