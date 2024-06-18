import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { GoalsResponseDto } from '../types/goal';

export const fetchGoals = createAsyncThunk<
GoalsResponseDto,
null,
ThunkConfig<string>
>(
  'goals/fetchGoals',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const state = getState().goals;
    try {
      const response = await extra.get<GoalsResponseDto>(
        '/goals',
        {
          params: {
            page: state.currentPage,
            limit: state.limit,
            completed: state.completed
          }
        }
      );

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
