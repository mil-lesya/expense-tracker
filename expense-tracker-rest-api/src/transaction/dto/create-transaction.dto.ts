import { CurrencyCode } from '../../currency/enums/currency-code.enum';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  walletId: string;

  @IsEnum(CurrencyCode)
  currency: CurrencyCode;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsDateString()
  date: Date;
}
