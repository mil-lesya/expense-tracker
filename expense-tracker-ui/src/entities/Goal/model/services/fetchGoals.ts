import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { GoalsResponseDto, RecordsPageGoalsDto } from '../types/goal';

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
      const response = await extra.api.get<GoalsResponseDto>(
        '/goals',
        {
          params: {
            page: state.currentPage,
            limit: state.limit,
            completed: state.completed
          }
        }
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
