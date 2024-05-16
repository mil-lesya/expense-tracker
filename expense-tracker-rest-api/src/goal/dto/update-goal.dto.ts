import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';
import { Transform } from 'class-transformer';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumberString()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  goalAmount: number;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency: CurrencyCode;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  targetDate: string;

  @IsNumberString()
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
