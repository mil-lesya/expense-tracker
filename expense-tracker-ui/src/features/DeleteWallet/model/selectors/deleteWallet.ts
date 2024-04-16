import { StateSchema } from 'app/providers/StoreProvider';

export const getDeleteWalletIsLoading = (state: StateSchema) => state.deleteWallet?.isLoading;
export const getDeleteWalletError = (state: StateSchema) => state.deleteWallet?.error;
