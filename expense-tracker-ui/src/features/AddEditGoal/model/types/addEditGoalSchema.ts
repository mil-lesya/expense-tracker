import { CurrencyCode } from 'shared/const/common';

export interface AddEditGoalSchema {
  name: string
  goalAmount: number | null
  currency: CurrencyCode
  depositedAmount: number | null
  targetDate: string
  image: File | null
  isCompleted: boolean
  isLoading: boolean
  error?: string
}

export interface AddGoalDto {
  name: string
  goalAmount: number | null
  currency: CurrencyCode
  depositedAmount?: number | null
  targetDate?: string
  image: File
  isCompleted: boolean
}

export interface EditGoalDto {
  id: string
  name?: string
  goalAmount?: number | null
  currency?: CurrencyCode
  depositedAmount?: number | null
  targetDate?: string
  image?: File
  isCompleted?: boolean
}
