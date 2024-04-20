import { IsEnum, IsString } from 'class-validator';
import { CategoryType } from '../enum/category.type';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsEnum(CategoryType)
  type: CategoryType;
}
