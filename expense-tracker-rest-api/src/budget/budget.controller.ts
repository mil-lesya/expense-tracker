import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './entity/budget.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {
  }

  @Post()
  create(@Body() body: CreateBudgetDto, @Req() req: any) {
    return this.budgetService.create(body, req.user.id);
  }

  @Get()
  async find(@Req() req: any, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.budgetService.findAll(req.user.id, page, limit);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req: any): Promise<Budget> {
    const budget = await this.budgetService.findById(id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @Req() req: any) {
    return this.budgetService.remove(req.user.id, id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateBudgetDto, @Req() req: any) {
    return this.budgetService.update(req.user.id, id, body);
  }

  @Get('/:id/limits')
  async findTransactions(@Param('id') id: string, @Req() req: any, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.budgetService.findLimitsByBudget(req.user.id, id, page, limit);
  }
}
