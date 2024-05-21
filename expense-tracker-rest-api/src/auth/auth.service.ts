import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserJwtResponse } from './interfaces/user-jwt.interface';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { NotificationService } from '../notification/notification.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @Transactional()
  async register(registerUser: SignupUserDto): Promise<UserJwtResponse> {
    const existingUser = await this.userService.findByEmail(registerUser.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    registerUser.isConfirmed = false;
    const user = await this.userService.create(registerUser);
    const token = this.jwtService.sign({ email: user.email });
    await this.notificationService.sendConfirmMail(user, token);
    const accessToken = this.generateToken(user.id);
    return { user, accessToken };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserJwtResponse> {
    const user = await this.userService.findByEmail(loginUserDto.email);
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

  async confirmEmail(token: string) {
    const email = await this.validateEmailToken(token);
    await this.userService.confirmEmail(email);
    return { message: 'Email confirmed successfully.' };
  }

  async sendPasswordResetEmail(email: string) {
    const token = this.jwtService.sign({ email });
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Such user does not exists');
    }
    await this.notificationService.sendPasswordResetEmail(user, token);
    return { message: 'Password reset email sent' };
  }

  async validateEmailToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload.email;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  async updatePassword(token: string, newPassword: string) {
    const email = await this.validateEmailToken(token);
    await this.userService.updatePassword(email, newPassword);
    return { message: 'Password has been reset' };
  }

  checkAuthorization(userIdFromToken: string, userIdFromEntity: string) {
    if (userIdFromToken !== userIdFromEntity) {
      throw new UnauthorizedException();
    }
  }

  private generateToken = (id: string): string => {
    return this.jwtService.sign(
      { id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      },
    );
  };
}
