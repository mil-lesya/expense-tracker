import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionResponseDto } from './interfaces/transaction.response.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('transactions')
export class TransactionController {
  constructor(private transactionsService: TransactionService) {
}

  @Post()
  async create(@Body() body: CreateTransactionDto, @Req() req: any): Promise<TransactionResponseDto>{
    return  await this.transactionsService.create(body, req.user.id);
  }

  @Get()
  async find(@Req() req: any): Promise<TransactionResponseDto[]> {
    return this.transactionsService.findByUser(req.user.id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<TransactionResponseDto> {
    return this.transactionsService.findByOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateTransactionDto, @Req() req: any): Promise<TransactionResponseDto> {
    return this.transactionsService.update(id, req.user.id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req: any): Promise<TransactionResponseDto> {
    return this.transactionsService.remove(id, req.user.id);
  }
}
