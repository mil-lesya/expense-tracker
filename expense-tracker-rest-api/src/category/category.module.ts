import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from './entities/category.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UserModule, AuthModule],
  providers: [CategoryService, AuthService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
