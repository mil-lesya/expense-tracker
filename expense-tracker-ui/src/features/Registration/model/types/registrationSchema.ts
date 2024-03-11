export interface RegistrationSchema {
  username: string
  email: string
  password: string
  defaultCurrency: string
  isLoading: boolean
  error?: string
}
