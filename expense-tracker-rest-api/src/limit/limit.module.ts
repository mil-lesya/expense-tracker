import { Module } from '@nestjs/common';
import { LimitService } from './limit.service';
import { LimitController } from './limit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Limit } from './entity/limit.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { BudgetService } from '../budget/budget.service';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { BudgetModule } from '../budget/budget.module';
import { Budget } from '../budget/entity/budget.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Limit, Budget, Category, User]),
    AuthModule,
    BudgetModule,
  ],
  providers: [
    LimitService,
    AuthService,
    BudgetService,
    CategoryService,
    UserService,
  ],
  controllers: [LimitController],
})
export class LimitModule {}
