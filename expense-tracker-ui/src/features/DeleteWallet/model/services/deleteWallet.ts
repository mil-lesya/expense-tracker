import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Wallet, fetchWallets } from 'entities/Wallet';
import { DeleteWalletDto } from '../types/deleteWalletSchema';

export const deleteWallet = createAsyncThunk<
Wallet,
DeleteWalletDto,
ThunkConfig<string>
>(
  'deleteWallet/deleteWallet',
  async ({ id }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.delete<Wallet>(`/wallets/${id}`);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchWallets({ page: 1, limit: 20 }));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
