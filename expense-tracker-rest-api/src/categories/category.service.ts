import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const user = await this.userService.findById(userId);
    if (await this.findOneByName(createCategoryDto.name, userId)) {
      throw new BadRequestException('Such category already exist.');
    }
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });
    return this.categoryRepository.save(category);
  }

  async findAll(userId: string, page: number, limit: number) {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .where('user_id = :userId OR user_id IS NULL', { userId });

    if (limit != null && page != null) {
      queryBuilder.take(limit);
      queryBuilder.skip(limit * (page - 1));
    }

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      categories: results,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  findById(id: string) {
    return this.categoryRepository.findOneBy({ id });
  }

  findOneByName(name: string, userId: string) {
    return this.categoryRepository.findOneBy({ name, user: { id: userId } });
  }

  async update(
    id: string,
    userId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (!category.user) {
      throw new BadRequestException('Cannot modify default categories');
    }
    this.authService.checkAuthorization(userId, category.user.id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: string, userId: string) {
    const category = await this.findById(id);
    if (!category) {
      throw new NotFoundException('Wallet not found');
    }
    if (!category.user) {
      throw new BadRequestException('Cannot delete default categories');
    }
    this.authService.checkAuthorization(userId, category.user.id);
    return this.categoryRepository.remove(category);
  }
}
