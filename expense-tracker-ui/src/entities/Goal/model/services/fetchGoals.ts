import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { RecordsPagesDto } from 'shared/types/requestTypes';
import { GoalsResponseDto } from '../types/goal';

export const fetchGoals = createAsyncThunk<
GoalsResponseDto,
RecordsPagesDto,
ThunkConfig<string>
>(
  'goals/fetchGoals',
  async ({ page, limit }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<GoalsResponseDto>(
        '/goals',
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
