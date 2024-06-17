import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { DeleteLimitDto } from '../types/deleteLimitSchema';
import { Limit, fetchLimits } from 'entities/Limit';

export const deleteLimit = createAsyncThunk<
Limit,
DeleteLimitDto,
ThunkConfig<string>
>(
  'deleteLimit/delete',
  async ({ id, budgetId }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.delete<Limit>(`/limit/${id}`);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchLimits(budgetId));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
