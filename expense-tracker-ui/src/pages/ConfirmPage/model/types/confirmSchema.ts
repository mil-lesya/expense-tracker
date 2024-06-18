export interface ConfirmSchema {
  isLoading: boolean
  error?: string
}

export interface ConfirmDto {
  token: string
  id?: string
}
