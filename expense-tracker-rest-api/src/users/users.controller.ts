import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService) {
  }

  @Get('/:id')
  async findUser(@Param('id') id: string, @Req() req: any) {
    this.authService.checkAuthorization(req.user.id, id);
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @Req() req: any) {
    this.authService.checkAuthorization(req.user.id, id);
    return this.usersService.remove(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto, @Req() req: any) {
    this.authService.checkAuthorization(req.user.id, id);
    return this.usersService.update(id, body);
  }
}
