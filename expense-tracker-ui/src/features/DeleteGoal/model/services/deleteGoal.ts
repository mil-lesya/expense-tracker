import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { DeleteGoalDto } from '../types/deleteGoalSchema';
import { Goal, fetchGoals } from 'entities/Goal';

export const deleteGoal = createAsyncThunk<
Goal,
DeleteGoalDto,
ThunkConfig<string>
>(
  'deleteGoal/delete',
  async ({ id }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.delete<Goal>(`/goals/${id}`);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchGoals());

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
