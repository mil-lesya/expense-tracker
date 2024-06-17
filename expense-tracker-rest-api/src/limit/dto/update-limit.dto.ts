import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLimitDto {
  @IsNumber()
  @IsOptional()
  amount: number;
}
