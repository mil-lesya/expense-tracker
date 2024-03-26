import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal) private goalRepository: Repository<Goal>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  async create(createGoalDto: CreateGoalDto, userId: string) {
    const user = await this.userService.findById(userId);
    const goal = this.goalRepository.create({
      ...createGoalDto,
      user,
      isCompleted: false,
      depositedAmount: 0,
      image: `${this.configService.get('API_DOMAIN')}/${userId}/goals/${createGoalDto.image}`,
    });
    return this.goalRepository.save(goal);
  }

  async findAll(userId: string, page: number, limit: number) {
    const [results, total] = await this.goalRepository.findAndCount({
      where: { user: { id: userId } },
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      goals: results,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  findById(id: string) {
    return this.goalRepository.findOneBy({ id });
  }

  async update(id: string, userId: string, updateGoalDto: UpdateGoalDto) {
    const goal = await this.findById(id);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    this.authService.checkAuthorization(userId, goal.user.id);

    if (updateGoalDto.image) {
      updateGoalDto.image = `${this.configService.get('API_DOMAIN')}/${userId}/goals/${updateGoalDto.image}`;
      if (goal.image) {
        const filename = goal.image.split('/').pop();
        const oldFilePath = join(
          __dirname,
          '../../uploads',
          userId,
          'goals',
          filename,
        );
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error(err);
        });
      }
    }
    Object.assign(goal, updateGoalDto);
    return this.goalRepository.save(goal);
  }

  async remove(id: string, userId: string) {
    const goal = await this.findById(id);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    this.authService.checkAuthorization(userId, goal.user.id);

    if (goal.image) {
      const filename = goal.image.split('/').pop();
      const oldFilePath = join(
        __dirname,
        '../../uploads',
        userId,
        'goals',
        filename,
      );
      fs.unlink(oldFilePath, (err) => {
        if (err) console.error(err);
      });
    }
    return this.goalRepository.remove(goal);
  }
}
