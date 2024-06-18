import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EditGoalDto } from '../types/addEditGoalSchema';
import { Goal } from 'entities/Goal/model/types/goal';
import { toFormData } from 'shared/lib/toFormData/toFormData';
import { fetchGoals } from 'entities/Goal/model/services/fetchGoals';

export const editGoal = createAsyncThunk<
Goal,
EditGoalDto,
ThunkConfig<string>
>(
  'addEditGoal/editGoal',
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
