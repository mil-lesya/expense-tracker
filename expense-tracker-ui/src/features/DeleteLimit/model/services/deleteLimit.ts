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
      const response = await extra.delete<Limit>(`/limit/${id}`);

      dispatch(fetchLimits(budgetId));

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
