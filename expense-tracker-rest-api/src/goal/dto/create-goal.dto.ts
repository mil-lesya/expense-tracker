import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class CreateGoalDto {
  @IsString()
  name: string;

  @IsNumberString()
  goalAmount: number;

  @IsEnum(CurrencyCode)
  currency: CurrencyCode;

  @IsDateString()
  targetDate: Date;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumberString()
  @IsOptional()
  depositedAmount: number;
}
