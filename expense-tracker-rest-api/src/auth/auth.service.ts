import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserJwtResponse } from './interfaces/user-jwt.interface';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(userId: string): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async register(registerUser: SignupUserDto): Promise<UserJwtResponse> {
    const existingUser = await this.usersService.findByEmail(registerUser.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.usersService.create(registerUser);
    const accessToken = this.generateToken(user.id);
    return { user, accessToken };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserJwtResponse> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException('Such user does not exists');
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const accessToken = this.generateToken(user.id);
    return { user, accessToken };
  }

  private generateToken = (id: string): string => {
    return this.jwtService.sign( {id} , {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES'),
    });
  };
}
