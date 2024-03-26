import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumberString()
  @IsOptional()
  goalAmount: number;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency: CurrencyCode;

  @IsDateString()
  @IsOptional()
  targetDate: Date;

  @IsNumberString()
  @IsOptional()
  depositedAmount: number;

  @IsString()
  @IsOptional()
  image: string;
}
