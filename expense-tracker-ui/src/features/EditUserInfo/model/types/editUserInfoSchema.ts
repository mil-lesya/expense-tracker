import { CurrencyCode } from 'shared/const/common';

export interface EditUserInfoSchema {
  username: string
  defaultCurrency: CurrencyCode
  isLoading: boolean
  error?: string
}

export interface EditUserInfoDto {
  id: string
  username?: string
  defaultCurrency?: CurrencyCode
}
