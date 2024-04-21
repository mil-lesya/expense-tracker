export interface DeleteTransactionSchema {
  isLoading: boolean
  error?: string
}

export interface DeleteTransactionDto {
  id: string
  currentPage: number
  limit: number
}
