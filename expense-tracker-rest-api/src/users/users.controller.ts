import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string, @Req() req: any) {
    if (req.user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.usersService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  removeUser(@Param('id') id: string, @Req() req: any) {
    if (req.user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.usersService.remove(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto, @Req() req: any) {
    if (req.user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.usersService.update(id, body);
  }
}
