import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { BudgetsResponseDto } from '../types/budget';
import { RecordsPagesDto } from 'shared/types/requestTypes';

export const fetchBudgets = createAsyncThunk<
BudgetsResponseDto,
RecordsPagesDto,
ThunkConfig<string>
>(
  'budgets/fetchBudgets',
  async ({ page, limit }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<BudgetsResponseDto>(
        '/budget',
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
