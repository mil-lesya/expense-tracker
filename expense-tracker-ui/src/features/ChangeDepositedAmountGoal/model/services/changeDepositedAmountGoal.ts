import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ChangeDepositedAmountGoalDto } from '../types/changeDepositedAmountGoalSchema';
import { Goal, fetchGoals } from 'entities/Goal';
import { toFormData } from 'shared/lib/toFormData/toFormData';

export const changeDepositedAmountGoal = createAsyncThunk<
Goal,
ChangeDepositedAmountGoalDto,
ThunkConfig<string>
>(
  'changeDepositedAmountGoal/change',
  async ({ id, ...goalData }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    const formData = toFormData(goalData);
    try {
      const response = await extra.patch<Goal>(`/goals/${id}`, formData);

      dispatch(fetchGoals());

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
