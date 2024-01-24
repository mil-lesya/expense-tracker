import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
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

}
