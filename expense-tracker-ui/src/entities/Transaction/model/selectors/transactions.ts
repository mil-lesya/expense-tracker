import { StateSchema } from 'app/providers/StoreProvider';

export const getTransactionsIsLoading = (state: StateSchema) => state.transactions?.isLoading;
export const getTransactionsError = (state: StateSchema) => state.transactions?.error;
export const getTransactionsCount = (state: StateSchema) => state.transactions?.count;
export const getTransactionsCurrentPage = (state: StateSchema) => state.transactions?.currentPage;
export const getTransactionsTotalPages = (state: StateSchema) => state.transactions?.totalPages;
