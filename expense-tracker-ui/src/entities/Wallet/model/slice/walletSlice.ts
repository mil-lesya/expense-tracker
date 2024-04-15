import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { Wallet, WalletSchema, WalletsResponseDto } from '../types/wallet';
import { fetchWallets } from '../services/fetchWallets';

const walletsAdapter = createEntityAdapter<Wallet>({
  selectId: (wallet) => wallet.id
});

export const getUserWallets = walletsAdapter.getSelectors<StateSchema>(
  (state) => state.wallets || walletsAdapter.getInitialState()
);

const walletsSlice = createSlice({
  name: 'walletsSlice',
  initialState: walletsAdapter.getInitialState<WalletSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchWallets.fulfilled, (
        state,
        action: PayloadAction<WalletsResponseDto>
      ) => {
        state.isLoading = false;
        walletsAdapter.setAll(state, action.payload.wallets);
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: walletsReducer } = walletsSlice;
