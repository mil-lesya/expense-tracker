import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';
import { Period } from '../enum/period.enum';

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsEnum(CurrencyCode)
  currency: CurrencyCode;

  @IsEnum(Period)
  period: Period;
}
