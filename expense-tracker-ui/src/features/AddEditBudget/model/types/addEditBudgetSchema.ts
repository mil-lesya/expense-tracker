import { BudgetPeriod } from 'entities/Budget';
import { CurrencyCode } from 'shared/const/common';

export interface AddEditBudgetSchema {
  name: string
  amount: number | null
  period: BudgetPeriod | null
  isLoading: boolean
  error?: string
}

export interface AddBudgetDto {
  name: string
  amount: number
  period: BudgetPeriod
  currency: CurrencyCode
}

export interface EditBudgetDto {
  id: string
  name?: string
  amount?: number
  period?: BudgetPeriod
  currency?: CurrencyCode
}
