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
  UseInterceptors
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoryController {
  constructor(private categoriesService: CategoryService) {
  }

  @Post()
  create(@Body() body: CreateCategoryDto, @Req() req: any): Promise<Category> {
    return this.categoriesService.create(body, req.user.id);
  }

  @Get()
  async find(@Req() req: any): Promise<Category[]> {
    return this.categoriesService.findAll(req.user.id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req: any): Promise<Category> {
    const category = await this.categoriesService.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto, @Req() req: any): Promise<Category> {
    return this.categoriesService.update(id, req.user.id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req: any): Promise<Category> {
    return this.categoriesService.remove(id, req.user.id);
  }
}
