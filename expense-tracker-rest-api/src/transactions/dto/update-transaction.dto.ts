import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export class UpdateTransactionDto {

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsUUID()
  @IsOptional()
  categoryId: string;

  @IsUUID()
  @IsOptional()
  walletId: string;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency: CurrencyCode;

  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;

  @IsDateString()
  @IsOptional()
  date: Date;
}