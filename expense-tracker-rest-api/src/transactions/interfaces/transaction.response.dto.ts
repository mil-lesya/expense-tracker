import { Category } from '../../categories/entities/category.entity';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export interface TransactionResponseDto{
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: Category
  walletId: string;
  currency: CurrencyCode;
}