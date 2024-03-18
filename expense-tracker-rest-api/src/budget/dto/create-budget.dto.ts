import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsEnum(CurrencyCode)
  currency: CurrencyCode;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}