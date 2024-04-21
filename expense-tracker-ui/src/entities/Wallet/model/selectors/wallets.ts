import { StateSchema } from 'app/providers/StoreProvider';
import { getUserWallets } from '../slice/walletSlice';
import { Wallet } from '../types/wallet';

export const getWalletsIsLoading = (state: StateSchema) => state.wallets?.isLoading;
export const getWalletsError = (state: StateSchema) => state.wallets?.error;
export const getWalletsCount = (state: StateSchema) => state.wallets?.count;
export const getWalletsCurrentPage = (state: StateSchema) => state.wallets?.currentPage;
export const getWalletsTotalPages = (state: StateSchema) => state.wallets?.totalPages;
export const getWalletsEntities = (state: StateSchema) => state.wallets?.entities;

export const getWalletsIsShowOnPanel = (state: StateSchema) => {
  const allWallets = getUserWallets.selectAll(state);
  return allWallets.filter((wallet: Wallet) => wallet.isShowOnPanel);
};
