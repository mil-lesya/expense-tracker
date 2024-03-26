import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateLimitDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  budgetId: string;
}
