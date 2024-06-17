import { CategoryDto } from 'entities/Category';

export interface AddEditLimitSchema {
  categoryId: string
  amount: number | null
  isLoading: boolean
  error?: string
}

export interface AddLimitDto {
  amount: number
  categoryId: string
  budgetId: string
  category?: CategoryDto
}

export interface EditLimitDto {
  id: string
  budgetId: string
  amount?: number
}
