import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { Wallet, fetchWallets } from 'entities/Wallet';
import { EditWalletDto } from '../types/addEditWalletSchema';
import { jwtDecode } from 'jwt-decode';
import { decodedToken } from 'shared/types/requestTypes';

export const editWallet = createAsyncThunk<
Wallet,
EditWalletDto,
ThunkConfig<string>
>(
  'addEditWallet/editEditWallet',
  async ({ id, ...walletData }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const decoded: decodedToken | null = token ? jwtDecode(token) : null;

    if (!token && !decoded?.id) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.patch<Wallet>(`/wallets/${id}`, walletData);

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
