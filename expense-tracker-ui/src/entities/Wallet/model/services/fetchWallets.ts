import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { WalletsResponseDto } from '../types/wallet';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { RecordsPagesDto } from 'shared/types/requestTypes';

export const fetchWallets = createAsyncThunk<
WalletsResponseDto,
RecordsPagesDto,
ThunkConfig<string>
>(
  'wallets/fetchWallets',
  async ({ page, limit }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.get<WalletsResponseDto>(
        '/wallets',
        {
          params: {
            page,
            limit
          }
        }
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
