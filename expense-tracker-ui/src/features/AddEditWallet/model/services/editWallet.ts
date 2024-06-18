import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Wallet, fetchWallets } from 'entities/Wallet';
import { EditWalletDto } from '../types/addEditWalletSchema';

export const editWallet = createAsyncThunk<
Wallet,
EditWalletDto,
ThunkConfig<string>
>(
  'addEditWallet/editEditWallet',
  async ({ id, ...walletData }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.patch<Wallet>(`/wallets/${id}`, walletData);

      dispatch(fetchWallets({ page: 1, limit: 20 }));

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
