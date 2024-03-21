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
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('wallets')
export class WalletController {

  constructor(private walletService: WalletService) {
  }

  @Post()
  create(@Body() body: CreateWalletDto, @Req() req: any) {
    return this.walletService.create(body, req.user.id);
  }

  @Get()
  async find(@Req() req: any, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.walletService.findAll(req.user.id, page, limit);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req: any): Promise<Wallet> {
    const wallet = await this.walletService.findById(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @Req() req: any) {
    return this.walletService.remove(id, req.user.id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateWalletDto, @Req() req: any) {
    return this.walletService.update(id, req.user.id, body);
  }

  @Get('/:id/transactions')
  async findTransactions(@Param('id') id: string, @Req() req: any, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.walletService.findTransactionByWallet(id, req.user.id, page, limit);
  }
}
