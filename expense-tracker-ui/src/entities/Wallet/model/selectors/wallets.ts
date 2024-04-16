import { StateSchema } from 'app/providers/StoreProvider';

export const getWalletsIsLoading = (state: StateSchema) => state.wallets?.isLoading;
export const getWalletsError = (state: StateSchema) => state.wallets?.error;
export const getWalletsCount = (state: StateSchema) => state.wallets?.count;
export const getWalletsCurrentPage = (state: StateSchema) => state.wallets?.currentPage;
export const getWalletsTotalPages = (state: StateSchema) => state.wallets?.totalPages;
