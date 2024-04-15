import WalletsList from './ui/WalletsList/WalletsList';

export { getWalletsIsLoading, getWalletsCount, getWalletsError, getWalletsCurrentPage, getWalletsTotalPages } from './model/selectors/wallets';
export { walletsReducer } from './model/slice/walletSlice';
export type { Wallet, WalletSchema, WalletsResponseDto } from './model/types/wallet';
export { WalletsList };
export { fetchWallets } from './model/services/fetchWallets';
