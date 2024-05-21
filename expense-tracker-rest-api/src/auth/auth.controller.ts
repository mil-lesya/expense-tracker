import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserJwtResponse } from './interfaces/user-jwt.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() signupDto: SignupUserDto): Promise<UserJwtResponse> {
    return this.authService.register(signupDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<UserJwtResponse> {
    return this.authService.login(loginDto);
  }

  @Get('confirm')
  async confirm(@Query('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @Post('forgot')
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.sendPasswordResetEmail(email);
  }

  @Post('reset')
  async resetPassword(
    @Query('token') token: string,
    @Body('password') newPassword: string,
  ) {
    return this.authService.updatePassword(token, newPassword);
  }
}
