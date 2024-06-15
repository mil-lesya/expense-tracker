import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LimitsResponseDto } from '../types/limit';

export const fetchLimits = createAsyncThunk<
LimitsResponseDto,
string,
ThunkConfig<string>
>(
  'limits/fetchLimits',
  async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<LimitsResponseDto>(
        `/budget/${id}/limits`,
        {
          params: {
            page: 1,
            limit: 10000
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
