import { EntityState } from '@reduxjs/toolkit';
import { Category } from 'entities/Category';
import { CurrencyCode } from 'shared/const/common';
import { RecordsPagesResponse } from 'shared/types/requestTypes';

export interface Limit {
  id: string
  amount: number
  category: Category
}

export interface LimitItemCard {
  id: string
  category: Category
  amount: number
  total: number
  balance: number
  currency: CurrencyCode
}

export interface LimitSchema extends EntityState<Limit> {
  isLoading?: boolean
  error?: string
}

export interface LimitsResponseDto extends RecordsPagesResponse {
  limits: Limit[]
}
