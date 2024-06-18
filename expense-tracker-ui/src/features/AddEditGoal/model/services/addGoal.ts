import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
// import { fetchWallets } from 'entities/Wallet';
import { AddGoalDto } from '../types/addEditGoalSchema';
import { Goal } from 'entities/Goal/model/types/goal';
import { fetchGoals } from 'entities/Goal/model/services/fetchGoals';
import { toFormData } from 'shared/lib/toFormData/toFormData';

export const addGoal = createAsyncThunk<
Goal,
AddGoalDto,
ThunkConfig<string>
>(
  'addEditGoal/addGoal',
  async (goalData, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    const formData = toFormData(goalData);

    try {
      const response = await extra.post<Goal>('/goals', formData);

      dispatch(fetchGoals());

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
