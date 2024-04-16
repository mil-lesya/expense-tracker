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
      const response = await extra.api.get<WalletsTotalBalanceResponseDto>('/wallets/balance');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
