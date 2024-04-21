import { StateSchema } from 'app/providers/StoreProvider';

export const getDeleteTransactionIsLoading = (state: StateSchema) => state.deleteTransaction?.isLoading;
export const getDeleteTransactionError = (state: StateSchema) => state.deleteTransaction?.error;
