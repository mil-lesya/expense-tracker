import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEditWalletIsLoading = (state: StateSchema) => state.addEditWallet?.isLoading;
export const getAddEditWalletError = (state: StateSchema) => state.addEditWallet?.error;
export const getAddEditWalletName = (state: StateSchema) => state.addEditWallet?.name;
export const getAddEditWalletCurrency = (state: StateSchema) => state.addEditWallet?.currency;
export const getAddEditWalletIsDefault = (state: StateSchema) => state.addEditWallet?.isDefault;
export const getAddEditWalletBalance = (state: StateSchema) => state.addEditWallet?.balance;
export const getAddEditWalletIsShowBalance = (state: StateSchema) => state.addEditWallet?.isShowBalance;
export const getAddEditWalletIsShowOnPanel = (state: StateSchema) => state.addEditWallet?.isShowOnPanel;
