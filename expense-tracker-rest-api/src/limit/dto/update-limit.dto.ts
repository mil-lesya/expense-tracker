import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateLimitDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  amount: number;
}