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
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './wallet.entity';
import { AuthService } from '../auth/auth.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('wallets')
export class WalletsController {

  constructor(private walletService: WalletsService, private authService: AuthService) {
  }

  @Post()
  create(@Body() body: CreateWalletDto, @Req() req: any) {
    return this.walletService.create(body, req.user.id);
  }

  @Get()
  async find(@Req() req: any) {
    const wallets = await this.walletService.findAll(req.user.id);
    if (!wallets) {
      throw new NotFoundException('Wallet not found');
    }
    return wallets;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req: any): Promise<Omit<Wallet, 'user'>> {
    const wallet = await this.walletService.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    this.authService.checkAuthorization(req.user.id, wallet.user.id);
    const { user, ...walletResponse } = wallet;
    return walletResponse;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @Req() req: any) {
    return this.walletService.remove(id, req.user.id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateWalletDto, @Req() req: any) {
    return this.walletService.update(id, req.user.id, body);
  }
}
