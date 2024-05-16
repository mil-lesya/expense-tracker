import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  goalAmount: number;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency: CurrencyCode;

  @IsOptional()
  targetDate: string;

  @IsNumber()
  @IsOptional()
  depositedAmount: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
