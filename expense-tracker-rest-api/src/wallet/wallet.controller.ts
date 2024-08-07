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
  UseInterceptors,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entity/wallet.entity';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  create(@Body() body: CreateWalletDto, @Req() req: any) {
    return this.walletService.create(body, req.user.id);
  }

  @Get()
  async find(
    @Req() req: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.walletService.findAll(req.user.id, page, limit);
  }

  @Get('/balance')
  async getTotalBalance(@Req() req: any) {
    return await this.walletService.getTotalBalance(req.user.id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Wallet> {
    const wallet = await this.walletService.findById(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.walletService.remove(id, req.user.id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateWalletDto,
    @Req() req: any,
  ) {
    return this.walletService.update(id, req.user.id, body);
  }
}
