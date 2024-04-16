import { FC, lazy } from 'react';
import { WalletsTotalBalanceProps } from './WalletsTotalBalance';

export const WalletsTotalBalanceAsync = lazy<FC<WalletsTotalBalanceProps>>(async () => await import('./WalletsTotalBalance'));
