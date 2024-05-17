import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeDepositedAmountGoal } from '../services/changeDepositedAmountGoal';
import { ChangeDepositedAmountGoalSchema } from '../types/changeDepositedAmountGoalSchema';

const initialState: ChangeDepositedAmountGoalSchema = {
  depositedAmount: null,
  isLoading: false
};

export const changeDepositedAmountGoalSlice = createSlice({
  name: 'changeDepositedAmountGoal',
  initialState,
  reducers: {
    setDepositedAmount: (state, action: PayloadAction<number | null>) => {
      state.depositedAmount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeDepositedAmountGoal.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(changeDepositedAmountGoal.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeDepositedAmountGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: changeDepositedAmountGoalActions } = changeDepositedAmountGoalSlice;
export const { reducer: changeDepositedAmountGoalReducer } = changeDepositedAmountGoalSlice;
