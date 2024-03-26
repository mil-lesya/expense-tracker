import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CurrencyCode } from '../currency/enums/currency-code.enum';
import { TransactionType } from './enums/transaction-type.enum';

export interface FilterOptions {
  search: string;
  startDate?: Date;
  endDate?: Date;
  currency?: CurrencyCode[];
  type?: TransactionType[];
  category?: string[];
  wallet?: string[];
}

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('transactions')
export class TransactionController {
  constructor(private transactionsService: TransactionService) {}

  @Post()
  async create(@Body() body: CreateTransactionDto, @Req() req: any) {
    return await this.transactionsService.create(body, req.user.id);
  }

  @Get()
  async find(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('filters') filters: FilterOptions,
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.transactionsService.findByUser(
      req.user.id,
      page,
      limit,
      search,
      filters,
      sort,
      order,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTransactionDto,
    @Req() req: any,
  ) {
    return this.transactionsService.update(id, req.user.id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.transactionsService.remove(id, req.user.id);
  }
}
