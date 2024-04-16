import { CurrencyCode } from 'shared/const/common';

export interface WalletsTotalBalanceSchema {
  totalBalance?: number
  currency?: CurrencyCode
  isLoading: boolean
  error?: string
}

export interface WalletsTotalBalanceResponseDto {
  totalBalance: number
  currency: CurrencyCode
}
