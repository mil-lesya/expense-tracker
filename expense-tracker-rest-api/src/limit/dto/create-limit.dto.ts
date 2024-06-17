import { IsNumber, IsUUID } from 'class-validator';

export class CreateLimitDto {
  @IsNumber()
  amount: number;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  budgetId: string;
}
