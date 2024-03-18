import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal]),
    UserModule,
    AuthModule,
    ConfigModule
  ],
  providers: [GoalService, AuthService, ConfigService],
  controllers: [GoalController]
})
export class GoalModule {}
