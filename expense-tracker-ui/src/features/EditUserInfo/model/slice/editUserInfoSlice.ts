import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { editUserInfo } from '../services/editUserInfo';
import { EditUserInfoSchema } from '../types/editUserInfoSchema';
import { CurrencyCode } from 'shared/const/common';

const initialState: EditUserInfoSchema = {
  username: '',
  defaultCurrency: CurrencyCode.USD,
  isLoading: false
};

export const editUserInfoSlice = createSlice({
  name: 'editUserInfo',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setDefaultCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.defaultCurrency = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUserInfo.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: editUserInfoActions } = editUserInfoSlice;
export const { reducer: editUserInfoReducer } = editUserInfoSlice;
