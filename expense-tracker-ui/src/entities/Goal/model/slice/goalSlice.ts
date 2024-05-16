import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { Goal, GoalSchema, GoalsResponseDto } from '../types/goal';
import { fetchGoals } from '../services/fetchGoals';

const goalsAdapter = createEntityAdapter<Goal>({
  selectId: (goal) => goal.id
});

export const getUserGoals = goalsAdapter.getSelectors<StateSchema>(
  (state) => state.goals || goalsAdapter.getInitialState()
);

const goalsSlice = createSlice({
  name: 'goalsSlice',
  initialState: goalsAdapter.getInitialState<GoalSchema>({
    isLoading: false,
    error: undefined,
    currentPage: 1,
    completed: false,
    limit: 10,
    ids: [],
    entities: {}
  }),
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.completed = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchGoals.fulfilled, (
        state,
        action: PayloadAction<GoalsResponseDto>
      ) => {
        state.isLoading = false;
        goalsAdapter.setAll(state, action.payload.goals);
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: goalsReducer } = goalsSlice;
export const { actions: goalsActions } = goalsSlice;
