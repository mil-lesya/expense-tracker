import { Category } from '../../category/entity/category.entity';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';

export interface TransactionResponseDto {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: Category;
  walletId: string;
  currency: CurrencyCode;
}
