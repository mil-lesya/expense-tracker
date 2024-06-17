export interface DeleteLimitSchema {
  isLoading: boolean
  error?: string
}

export interface DeleteLimitDto {
  id: string
  budgetId: string
}
