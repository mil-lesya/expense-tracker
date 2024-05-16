import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ChangeDepositedAmountGoalDto } from '../types/changeDepositedAmountGoalSchema';
import { Goal, fetchGoals } from 'entities/Goal';

export const changeDepositedAmountGoal = createAsyncThunk<
Goal,
ChangeDepositedAmountGoalDto,
ThunkConfig<string>
>(
  'changeDepositedAmountGoal/change',
  async ({ id, depositedAmount }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.patch<Goal>(`/goals/${id}`, { depositedAmount: depositedAmount.toString() });

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
