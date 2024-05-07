import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddEditGoalSchema } from '../types/addEditGoalSchema';
import { addGoal } from '../services/addGoal';
import { editGoal } from '../services/editGoal';
import { CurrencyCode } from 'shared/const/common';

const initialState: AddEditGoalSchema = {
  name: '',
  goalAmount: null,
  currency: CurrencyCode.USD,
  depositedAmount: null,
  targetDate: new Date().toISOString(),
  image: null,
  isCompleted: false,
  isLoading: false
};

export const addEditGoalSlice = createSlice({
  name: 'addEditGoal',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currency = action.payload;
    },
    setGoalAmount: (state, action: PayloadAction<number>) => {
      state.goalAmount = action.payload;
    },
    setDepositedAmount: (state, action: PayloadAction<number>) => {
      state.depositedAmount = action.payload;
    },
    setTargetDate: (state, action: PayloadAction<string>) => {
      state.targetDate = action.payload;
    },
    setImage: (state, action: PayloadAction<File>) => {
      state.image = action.payload;
    },
    setIsCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    resetState: (state, action: PayloadAction) => {
      state.name = '';
      state.currency = CurrencyCode.USD;
      state.goalAmount = null;
      state.depositedAmount = null;
      state.targetDate = '';
      state.image = null;
      state.isCompleted = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGoal.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editGoal.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editGoal.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: addEditGoalActions } = addEditGoalSlice;
export const { reducer: addEditGoalReducer } = addEditGoalSlice;
