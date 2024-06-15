import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EditBudgetDto } from '../types/addEditBudgetSchema';
import { Budget, fetchBudgets } from 'entities/Budget';

export const editBudget = createAsyncThunk<
Budget,
EditBudgetDto,
ThunkConfig<string>
>(
  'addEditBudget/edit',
  async ({ id, ...requestBody }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.patch<Budget>(`/budget/${id}`, requestBody);
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
