import { StateSchema } from 'app/providers/StoreProvider';

export const getAddTransactionIsLoading = (state: StateSchema) => state.addTransaction?.isLoading;
export const getAddTransactionError = (state: StateSchema) => state.addTransaction?.error;
export const getAddTransactionDate = (state: StateSchema) => state.addTransaction?.date;
export const getAddTransactionAmount = (state: StateSchema) => state.addTransaction?.amount;
export const getAddTransactionCurrency = (state: StateSchema) => state.addTransaction?.currency;
export const getAddTransactionDescription = (state: StateSchema) => state.addTransaction?.description;
export const getAddTransactionType = (state: StateSchema) => state.addTransaction?.type;
export const getAddTransactionCategoryId = (state: StateSchema) => state.addTransaction?.categoryId;
export const getAddTransactionWalletId = (state: StateSchema) => state.addTransaction?.walletId;
