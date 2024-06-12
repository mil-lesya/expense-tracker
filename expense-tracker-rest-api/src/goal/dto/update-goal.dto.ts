import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';
import { Transform } from 'class-transformer';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  goalAmount: number;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency: CurrencyCode;

  @IsOptional()
  targetDate: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  depositedAmount: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isCompleted: boolean;
}
