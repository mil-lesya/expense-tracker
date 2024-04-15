import { CurrencyCode } from 'shared/const/common';

export interface AddEditWalletSchema {
  name: string
  balance: number | null
  isDefault: boolean
  isShowBalance: boolean
  isShowOnPanel: boolean
  currency: CurrencyCode
  isLoading: boolean
  error?: string
}

export interface AddWalletDto {
  name: string
  balance: number
  isDefault: boolean
  isShowBalance: boolean
  isShowOnPanel: boolean
  currency: CurrencyCode
}

export interface EditWalletDto {
  id: string
  name?: string
  balance?: number
  isDefault?: boolean
  isShowBalance?: boolean
  isShowOnPanel?: boolean
  currency?: CurrencyCode
}
