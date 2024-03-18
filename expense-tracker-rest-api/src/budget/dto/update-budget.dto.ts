import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class UpdateBudgetDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency: CurrencyCode;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;
}