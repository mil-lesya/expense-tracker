import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
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

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.post<Wallet>('/wallets', walletData);

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
