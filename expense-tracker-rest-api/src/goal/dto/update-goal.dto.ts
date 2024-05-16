import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  targetDate: string;

  @IsNumberString()
  @IsOptional()
  depositedAmount: number;

  @IsString()
  @IsOptional()
  image: string;
}
