import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { RegistrationSchema } from '../types/registrationSchema';

const initialState: RegistrationSchema = {
  isLoading: false,
  email: '',
  password: '',
  username: '',
  defaultCurrency: ''
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
    setDefaultCurrency: (state, action: PayloadAction<string>) => {
      state.defaultCurrency = action.payload;
    }
  }
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginByEmail.pending, (state) => {
//         state.error = undefined;
//         state.isLoading = true;
//       })
//       .addCase(loginByEmail.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })
//       .addCase(loginByEmail.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   }
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;
