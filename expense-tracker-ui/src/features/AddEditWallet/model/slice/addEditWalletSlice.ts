import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddEditWalletSchema } from '../types/addEditWalletSchema';
import { addWallet } from '../services/addWallet';
import { editWallet } from '../services/editWallet';
import { CurrencyCode } from 'shared/const/common';

const initialState: AddEditWalletSchema = {
  name: '',
  currency: CurrencyCode.USD,
  balance: null,
  isDefault: false,
  isShowBalance: true,
  isShowOnPanel: true,
  isLoading: false
};

export const addEditWalletSlice = createSlice({
  name: 'addEditWallet',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currency = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setIsDefault: (state, action: PayloadAction<boolean>) => {
      state.isDefault = action.payload;
    },
    setIsShowBalance: (state, action: PayloadAction<boolean>) => {
      state.isShowBalance = action.payload;
    },
    setIsShowOnPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowOnPanel = action.payload;
    },
    resetState: (state, action: PayloadAction) => {
      state.name = '';
      state.currency = CurrencyCode.USD;
      state.balance = null;
      state.isDefault = false;
      state.isShowBalance = true;
      state.isShowOnPanel = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWallet.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addWallet.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editWallet.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editWallet.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: addEditWalletActions } = addEditWalletSlice;
export const { reducer: addEditWalletReducer } = addEditWalletSlice;
