import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { WalletsTotalBalanceResponseDto } from '../types/walletsTotalBalanceSchema';

export const getWalletsTotalBalance = createAsyncThunk<
WalletsTotalBalanceResponseDto,
null,
ThunkConfig<string>
>(
  'walletsTotalBalance/getWalletsTotalBalance',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.get<WalletsTotalBalanceResponseDto>('/wallets/balance');

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
