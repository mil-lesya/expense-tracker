import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EditLimitDto } from '../types/addEditLimitSchema';
import { Limit, fetchLimits } from 'entities/Limit';
import { fetchCategory } from 'entities/Category';

export const editLimit = createAsyncThunk<
Limit,
EditLimitDto,
ThunkConfig<string>
>(
  'addEditLimit/edit',
  async ({ id, ...requestBody }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.patch<Limit>(`/limit/${id}`, requestBody);
      if (!response.data) {
        throw new Error('Failed to add limit');
      }

      await dispatch(fetchLimits(requestBody.budgetId));
      await dispatch(fetchCategory());

      return response.data;
    } catch (e) {
      return rejectWithValue(e.message || 'Unknown error');
    }
  }
);
