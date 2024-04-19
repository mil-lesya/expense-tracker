import { EntityState } from '@reduxjs/toolkit';
import { RecordsPagesResponse } from 'shared/types/requestTypes';

export interface Category {
  id: string
  name: string
  icon: string
}

export interface CategorySchema extends EntityState<Category> {
  isLoading?: boolean
  error?: string
}

export interface CategoryResponseDto extends RecordsPagesResponse {
  categories: Category[]
}
