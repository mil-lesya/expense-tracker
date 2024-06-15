import { createSlice } from '@reduxjs/toolkit';
import { deleteBudget } from '../services/deleteBudget';
import { DeleteBudgetSchema } from '../types/deleteBudgetSchema';

const initialState: DeleteBudgetSchema = {
  isLoading: false
};

export const deleteBudgetSlice = createSlice({
  name: 'deleteBudget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBudget.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: deleteBudgetActions } = deleteBudgetSlice;
export const { reducer: deleteBudgetReducer } = deleteBudgetSlice;
