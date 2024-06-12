import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBudgetDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  amount: number;
}
