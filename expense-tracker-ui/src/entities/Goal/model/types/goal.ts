import { EntityState } from '@reduxjs/toolkit';
import { CurrencyCode } from 'shared/const/common';
import { RecordsPagesResponse } from 'shared/types/requestTypes';

export interface Goal {
  id: string
  name: string
  goalAmount: number
  currency: CurrencyCode
  targetDate: string
  image: string
  depositedAmount: number
  isCompleted: boolean
}

export interface GoalSchema extends EntityState<Goal> {
  isLoading?: boolean
  error?: string
  count?: number
  totalPages?: number
  currentPage?: number
}

export interface GoalsResponseDto extends RecordsPagesResponse {
  goals: Goal[]
}
