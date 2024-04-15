import { EntityState } from '@reduxjs/toolkit';
import { CurrencyCode } from 'shared/const/common';
import { RecordsPagesResponse } from 'shared/types/requestTypes';

export interface Wallet {
  id: string
  name: string
  balance: number
  isDefault: boolean
  isShowBalance: boolean
  isShowOnPanel: boolean
  currency: CurrencyCode
}

export interface WalletSchema extends EntityState<Wallet> {
  isLoading?: boolean
  error?: string
  count?: number
  totalPages?: number
  currentPage?: string
}

export interface WalletsResponseDto extends RecordsPagesResponse {
  wallets: Wallet[]
}
