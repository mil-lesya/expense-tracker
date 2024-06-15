import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddBudgetDto } from '../types/addEditBudgetSchema';
import { Budget, fetchBudgets } from 'entities/Budget';

export const addBudget = createAsyncThunk<
Budget,
AddBudgetDto,
ThunkConfig<string>
>(
  'addEditBudget/add',
  async (requestBody, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.post<Budget>('/budget', requestBody);
      if (!response.data) {
        throw new Error('Failed to add budget');
      }

      await dispatch(fetchBudgets({ page: 1, limit: 10 }));

      return response.data;
    } catch (e) {
      return rejectWithValue(e.message || 'Unknown error');
    }
  }
);
