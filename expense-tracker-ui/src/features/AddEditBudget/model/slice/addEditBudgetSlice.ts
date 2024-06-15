import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addBudget } from '../services/addBudget';
import { AddEditBudgetSchema } from '../types/addEditBudgetSchema';
import { BudgetPeriod } from 'entities/Budget';
import { editBudget } from '../services/editBudget';

const initialState: AddEditBudgetSchema = {
  name: '',
  amount: null,
  period: null,
  isLoading: false
};

export const addEditBudgetSlice = createSlice({
  name: 'addEditBudget',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<BudgetPeriod>) => {
      state.period = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    resetState: (state, action: PayloadAction) => {
      state.name = '';
      state.amount = null;
      state.period = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBudget.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editBudget.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editBudget.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: addEditBudgetActions } = addEditBudgetSlice;
export const { reducer: addEditBudgetReducer } = addEditBudgetSlice;
