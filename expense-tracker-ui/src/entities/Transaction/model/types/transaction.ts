import { EntityState } from '@reduxjs/toolkit';
import { Category } from 'entities/Category';
import { CurrencyCode } from 'shared/const/common';
import { RecordsPagesDto, RecordsPagesResponse } from 'shared/types/requestTypes';

export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  currency: CurrencyCode
  type: TransactionType
  category: Category | null
  walletId: string
}

export interface TransactionSchema extends EntityState<Transaction> {
  isLoading?: boolean
  error?: string
  count?: number
  totalPages?: number
  currentPage: number
}

export interface RecordsPageTransactionDto extends RecordsPagesDto {
  type?: string
  currency?: string
  category?: string
  wallet?: string
  search?: string
  startDate?: string
  endDate?: string
  minAmount?: string
  maxAmount?: string
}

export interface TransactionsResponseDto extends RecordsPagesResponse {
  transactions: Transaction[]
}
