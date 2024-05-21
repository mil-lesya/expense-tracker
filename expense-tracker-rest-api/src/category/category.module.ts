import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from './entity/category.entity';
import { AuthService } from '../auth/auth.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    UserModule,
    AuthModule,
    NotificationModule,
  ],
  providers: [CategoryService, AuthService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
