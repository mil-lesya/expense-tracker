import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddLimitDto } from '../types/addEditLimitSchema';
import { Limit, fetchLimits } from 'entities/Limit';
import { addCategory, fetchCategory } from 'entities/Category';

export const addLimit = createAsyncThunk<
Limit,
AddLimitDto,
ThunkConfig<string>
>(
  'addEditLimit/add',
  async ({ category, ...requestBody }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      let request = requestBody;

      if (category) {
        const categoryResponse = await dispatch(addCategory(category)).unwrap();
        if (!categoryResponse.id) {
          throw new Error('Category creation failed');
        }
        request = { ...requestBody, categoryId: categoryResponse.id };
      }

      const response = await extra.api.post<Limit>('/limit', request);
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
