import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, getDestination, imageFileFilter } from './file-upload';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('goals')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: getDestination,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateGoalDto,
    @Req() req: any,
  ) {
    if (file) {
      body.image = file.filename;
    }
    return this.goalService.create(body, req.user.id);
  }

  @Get()
  async find(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.goalService.findAll(req.user.id, page, limit);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const goal = await this.goalService.findById(id);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    return goal;
  }

  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: getDestination,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: UpdateGoalDto,
    @Req() req: any,
  ) {
    if (file) {
      body.image = file.filename;
    }
    return this.goalService.update(id, req.user.id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @Req() req: any) {
    return this.goalService.remove(id, req.user.id);
  }
}
