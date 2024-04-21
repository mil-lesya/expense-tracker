import { TransactionType } from 'entities/Transaction';
import { CurrencyCode } from 'shared/const/common';

export interface EditTransactionSchema {
  date: string | null
  walletId: string
  categoryId: string
  type: TransactionType | null
  description: string
  amount: number
  currency: CurrencyCode
  isLoading: boolean
  error?: string
}

export interface EditTransactionDto {
  id: string
  date?: string | null
  walletId?: string
  categoryId?: string
  type?: TransactionType
  description?: string
  amount?: number
  currency?: CurrencyCode
  currentPage: number
  limit: number
}
