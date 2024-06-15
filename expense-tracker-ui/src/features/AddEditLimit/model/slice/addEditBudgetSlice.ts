import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addLimit } from '../services/addLimit';
import { AddEditLimitSchema } from '../types/addEditLimitSchema';
import { editLimit } from '../services/editLimit';

const initialState: AddEditLimitSchema = {
  amount: null,
  categoryId: '',
  isLoading: false
};

export const addEditLimitSlice = createSlice({
  name: 'addEditLimit',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    resetState: (state, action: PayloadAction) => {
      state.amount = null;
      state.categoryId = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLimit.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addLimit.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editLimit.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editLimit.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: addEditLimitActions } = addEditLimitSlice;
export const { reducer: addEditLimitReducer } = addEditLimitSlice;
