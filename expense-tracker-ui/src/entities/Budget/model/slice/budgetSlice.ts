import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { Budget, BudgetSchema, BudgetsResponseDto } from '../types/budget';
import { fetchBudgets } from '../services/fetchBudgets';

const budgetsAdapter = createEntityAdapter<Budget>({
  selectId: (budget) => budget.id
});

export const getUserBudgets = budgetsAdapter.getSelectors<StateSchema>(
  (state) => state.budgets || budgetsAdapter.getInitialState()
);

const budgetsSlice = createSlice({
  name: 'budgetsSlice',
  initialState: budgetsAdapter.getInitialState<BudgetSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchBudgets.fulfilled, (
        state,
        action: PayloadAction<BudgetsResponseDto>
      ) => {
        state.isLoading = false;
        budgetsAdapter.setAll(state, action.payload.budgets);
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: budgetsReducer } = budgetsSlice;
