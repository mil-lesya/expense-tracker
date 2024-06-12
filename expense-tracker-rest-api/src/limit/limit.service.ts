import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLimitDto } from './dto/create-limit.dto';
import { UpdateLimitDto } from './dto/update-limit.dto';
import { Limit } from './entity/limit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { BudgetService } from '../budget/budget.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class LimitService {
  constructor(
    @InjectRepository(Limit) private limitRepository: Repository<Limit>,
    private readonly budgetService: BudgetService,
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService,
  ) {}

  async create(createLimitDto: CreateLimitDto, userId: string) {
    const budget = await this.budgetService.findById(createLimitDto.budgetId);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    this.authService.checkAuthorization(userId, budget.user.id);

    const category = await this.categoryService.findById(
      createLimitDto.categoryId,
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (category?.user) {
      this.authService.checkAuthorization(userId, category.user.id);
    }

    const limit = await this.limitRepository.findOne({
      where: { budget: { id: budget.id }, category: { id: category.id } },
    });
    if (limit) {
      throw new BadRequestException('Limit for a such category already exists');
    }

    const newLimit = this.limitRepository.create({
      ...createLimitDto,
      budget,
      category,
    });
    return this.limitRepository.save(newLimit);
  }

  findById(id: string) {
    return this.limitRepository.findOneBy({ id });
  }

  async update(userId: string, id: string, updateBudgetDto: UpdateLimitDto) {
    const limit = await this.findById(id);
    if (!limit) {
      throw new NotFoundException('Limit not found');
    }
    this.authService.checkAuthorization(userId, limit.budget.user.id);
    Object.assign(limit, updateBudgetDto);
    return this.limitRepository.save(limit);
  }

  async remove(userId: string, id: string) {
    const limit = await this.findById(id);
    if (!limit) {
      throw new NotFoundException('Limit not found');
    }
    this.authService.checkAuthorization(userId, limit.budget.user.id);
    return this.limitRepository.remove(limit);
  }
}
