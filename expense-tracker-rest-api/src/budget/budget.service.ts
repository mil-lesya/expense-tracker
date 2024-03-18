import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './entity/budget.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../wallets/entities/wallet.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { Limit } from '../limit/entity/limit.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget) private budgetRepository: Repository<Budget>,
    @InjectRepository(Limit) private limitRepository: Repository<Limit>,
    private readonly userService: UserService,
    private readonly authService: AuthService) {
  }
  async create(createBudgetDto: CreateBudgetDto, userId: string) {
    const user = await this.userService.findById(userId);
    const budget = this.budgetRepository.create({ ...createBudgetDto, user });
    return this.budgetRepository.save(budget);
  }

  findAll(userId: string) {
    return this.budgetRepository.find({ where: { user: { id: userId } } });
  }

  async findLimitsByBudget(userId: string, budgetId: string) {
    const budget = await this.findById(budgetId);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    this.authService.checkAuthorization(userId, budget.user.id);
    return this.limitRepository.find({where: { budget: {id: budgetId}}})
  }

  findById(id: string) {
    return this.budgetRepository.findOneBy({ id });
  }

  async update(userId: string, id: string, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.findById(id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    this.authService.checkAuthorization(userId, budget.user.id);
    Object.assign(budget, updateBudgetDto);
    return this.budgetRepository.save(budget);

  }

  async remove(userId: string, id: string) {
    const budget = await this.findById(id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    this.authService.checkAuthorization(userId, budget.user.id);
    return this.budgetRepository.remove(budget);
  }
}