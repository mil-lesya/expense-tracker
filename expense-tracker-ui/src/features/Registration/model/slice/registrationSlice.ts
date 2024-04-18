import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/registrationSchema';
import { registrationByEmail } from '../services/registrationByEmail/registrationByEmail';
import { CurrencyCode } from 'shared/const/common';

const initialState: RegistrationSchema = {
  isLoading: false,
  email: '',
  password: '',
  username: '',
  defaultCurrency: CurrencyCode.USD
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setDefaultCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.defaultCurrency = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationByEmail.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registrationByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registrationByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;
