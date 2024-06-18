import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Wallet, fetchWallets } from 'entities/Wallet';
import { AddWalletDto } from '../types/addEditWalletSchema';

export const addWallet = createAsyncThunk<
Wallet,
AddWalletDto,
ThunkConfig<string>
>(
  'addEditWallet/addEditWallet',
  async (walletData, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.post<Wallet>('/wallets', walletData);

      dispatch(fetchWallets({ page: 1, limit: 20 }));

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
