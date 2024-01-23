import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findById(id);
    if ( !user ) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findById(id);
    if ( !user ) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
