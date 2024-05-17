import { createSlice } from '@reduxjs/toolkit';
import { deleteGoal } from '../services/deleteGoal';
import { DeleteGoalSchema } from '../types/deleteGoalSchema';

const initialState: DeleteGoalSchema = {
  isLoading: false
};

export const deleteGoalSlice = createSlice({
  name: 'deleteGoal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGoal.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: deleteGoalActions } = deleteGoalSlice;
export const { reducer: deleteGoalReducer } = deleteGoalSlice;
