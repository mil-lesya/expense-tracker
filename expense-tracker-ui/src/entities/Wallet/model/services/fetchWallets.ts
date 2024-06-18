import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { WalletsResponseDto } from '../types/wallet';
import { RecordsPagesDto } from 'shared/types/requestTypes';

export const fetchWallets = createAsyncThunk<
WalletsResponseDto,
RecordsPagesDto,
ThunkConfig<string>
>(
  'wallets/fetchWallets',
  async ({ page, limit }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.get<WalletsResponseDto>(
        '/wallets',
        {
          params: {
            page,
            limit
          }
        }
      );

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
