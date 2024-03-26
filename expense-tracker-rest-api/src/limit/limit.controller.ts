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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LimitService } from './limit.service';
import { CreateLimitDto } from './dto/create-limit.dto';
import { UpdateLimitDto } from './dto/update-limit.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('limit')
export class LimitController {
  constructor(private limitService: LimitService) {}
  @Post()
  create(@Body() body: CreateLimitDto, @Req() req: any) {
    return this.limitService.create(body, req.user.id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const limit = await this.limitService.findById(id);
    if (!limit) {
      throw new NotFoundException('Limit not found');
    }
    return limit;
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.limitService.remove(req.user.id, id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateLimitDto,
    @Req() req: any,
  ) {
    return this.limitService.update(req.user.id, id, body);
  }
}
