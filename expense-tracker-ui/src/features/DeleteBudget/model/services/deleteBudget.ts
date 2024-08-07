import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { DeleteBudgetDto } from '../types/deleteBudgetSchema';
import { Budget } from 'entities/Budget/model/types/budget';
import { fetchBudgets } from 'entities/Budget';

export const deleteBudget = createAsyncThunk<
Budget,
DeleteBudgetDto,
ThunkConfig<string>
>(
  'deleteBudget/delete',
  async ({ id }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.delete<Budget>(`/budget/${id}`);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchBudgets({ page: 1, limit: 10 }));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
