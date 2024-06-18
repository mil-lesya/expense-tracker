export interface ResetPasswordSchema {
  password: string
  isLoading: boolean
  error?: string
}

export interface ResetPasswordDto {
  token: string
  password: string
}
