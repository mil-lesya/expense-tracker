import { StateSchema } from 'app/providers/StoreProvider';

export const getEditTransactionIsLoading = (state: StateSchema) => state.editTransaction?.isLoading;
export const getEditTransactionError = (state: StateSchema) => state.editTransaction?.error;
export const getEditTransactionDate = (state: StateSchema) => state.editTransaction?.date;
export const getEditTransactionAmount = (state: StateSchema) => state.editTransaction?.amount;
export const getEditTransactionCurrency = (state: StateSchema) => state.editTransaction?.currency;
export const getEditTransactionDescription = (state: StateSchema) => state.editTransaction?.description;
export const getEditTransactionType = (state: StateSchema) => state.editTransaction?.type;
export const getEditTransactionCategoryId = (state: StateSchema) => state.editTransaction?.categoryId;
export const getEditTransactionWalletId = (state: StateSchema) => state.editTransaction?.walletId;
