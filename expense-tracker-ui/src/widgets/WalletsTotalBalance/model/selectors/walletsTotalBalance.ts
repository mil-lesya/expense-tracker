import { StateSchema } from 'app/providers/StoreProvider';

export const getWalletsTotalBalanceIsLoading = (state: StateSchema) => state.walletsTotalBalance?.isLoading;
export const getWalletsTotalBalanceError = (state: StateSchema) => state.walletsTotalBalance?.error;
export const getWalletsTotalBalanceNumber = (state: StateSchema) => state.walletsTotalBalance?.totalBalance;
export const getWalletsTotalBalanceCurrency = (state: StateSchema) => state.walletsTotalBalance?.currency;
