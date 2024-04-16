import { createSlice } from '@reduxjs/toolkit';
import { getWalletsTotalBalance } from '../services/getWalletsTotalBalance';
import { WalletsTotalBalanceSchema } from '../types/walletsTotalBalanceSchema';

const initialState: WalletsTotalBalanceSchema = {
  isLoading: false
};

export const walletsTotalBalanceSlice = createSlice({
  name: 'walletsTotalBalance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWalletsTotalBalance.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getWalletsTotalBalance.fulfilled, (state, action) => {
        state.totalBalance = action.payload.totalBalance;
        state.currency = action.payload.currency;
        state.isLoading = false;
      })
      .addCase(getWalletsTotalBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: walletsTotalBalanceActions } = walletsTotalBalanceSlice;
export const { reducer: walletsTotalBalanceReducer } = walletsTotalBalanceSlice;
