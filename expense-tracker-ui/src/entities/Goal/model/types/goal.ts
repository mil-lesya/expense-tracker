import { EntityState } from '@reduxjs/toolkit';
import { CurrencyCode } from 'shared/const/common';
import { RecordsPagesDto, RecordsPagesResponse } from 'shared/types/requestTypes';

export interface Goal {
  id: string
  name: string
  goalAmount: number
  currency: CurrencyCode
  targetDate: string | null
  image: string | null
  depositedAmount: number
  isCompleted: boolean
}

export interface GoalSchema extends EntityState<Goal> {
  isLoading?: boolean
  error?: string
  count?: number
  totalPages?: number
  currentPage?: number
  limit: number
  completed: boolean
}

export interface RecordsPageGoalsDto extends RecordsPagesDto {
  completed: boolean
}

export interface GoalsResponseDto extends RecordsPagesResponse {
  goals: Goal[]
}
