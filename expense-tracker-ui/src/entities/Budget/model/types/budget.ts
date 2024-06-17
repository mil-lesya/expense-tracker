import { EntityState } from '@reduxjs/toolkit';
import { CurrencyCode } from 'shared/const/common';
import { RecordsPagesResponse } from 'shared/types/requestTypes';

export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

export interface Budget {
  id: string
  name: string
  amount: number
  currency: CurrencyCode
  period: BudgetPeriod
}

export interface BudgetItemCarusel {
  id: string
  name: string
  amount: number
  currency: CurrencyCode
  period: BudgetPeriod
  total: number
}

export interface BudgetSchema extends EntityState<Budget> {
  isLoading?: boolean
  error?: string
}

export interface BudgetsResponseDto extends RecordsPagesResponse {
  budgets: Budget[]
}
