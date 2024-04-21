import { EntityState } from '@reduxjs/toolkit';
import { TransactionType } from 'entities/Transaction';
import { RecordsPagesResponse } from 'shared/types/requestTypes';

export interface Category {
  id: string
  name: string
  type: TransactionType
  icon: string
}

export interface CategorySchema extends EntityState<Category> {
  isLoading?: boolean
  error?: string
}

export interface CategoryResponseDto extends RecordsPagesResponse {
  categories: Category[]
}

export interface CategoryDto {
  name: string
  type: TransactionType
  icon: string
}
