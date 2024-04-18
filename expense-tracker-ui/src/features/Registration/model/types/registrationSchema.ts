import { CurrencyCode } from 'shared/const/common';

export interface RegistrationSchema {
  username: string
  defaultCurrency: CurrencyCode
  email: string
  password: string
  isLoading: boolean
  error?: string
}
