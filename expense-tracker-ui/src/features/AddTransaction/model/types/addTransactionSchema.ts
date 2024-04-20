import { TransactionType } from 'entities/Transaction';
import { CurrencyCode } from 'shared/const/common';

export interface AddTransactionSchema {
  date: string | null
  walletId: string
  categoryId: string
  type: TransactionType | null
  description: string
  amount: number | null
  currency: CurrencyCode
  isLoading: boolean
  error?: string
}

export interface AddTransactionDto {
  date: string
  walletId: string
  categoryId: string
  type: TransactionType
  description: string
  amount: number
  currency: CurrencyCode
}
