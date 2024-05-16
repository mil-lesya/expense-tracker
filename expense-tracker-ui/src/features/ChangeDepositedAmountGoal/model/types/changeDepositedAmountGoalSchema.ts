export interface ChangeDepositedAmountGoalSchema {
  depositedAmount: number | null
  isLoading: boolean
  error?: string
}

export interface ChangeDepositedAmountGoalDto {
  id: string
  depositedAmount: number
  isCompleted?: boolean
}
