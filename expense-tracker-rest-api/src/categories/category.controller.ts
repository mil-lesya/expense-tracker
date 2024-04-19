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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoryController {
  constructor(private categoriesService: CategoryService) {}

  @Post()
  create(@Body() body: CreateCategoryDto, @Req() req: any) {
    return this.categoriesService.create(body, req.user.id);
  }

  @Get()
  async find(
    @Req() req: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.categoriesService.findAll(req.user.id, page, limit);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
    @Req() req: any,
  ) {
    return this.categoriesService.update(id, req.user.id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.categoriesService.remove(id, req.user.id);
  }
}
