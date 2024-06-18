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
      const response = await extra.delete<Wallet>(`/wallets/${id}`);

      dispatch(fetchWallets({ page: 1, limit: 20 }));

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
