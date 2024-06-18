import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLoginResponseDto, userActions } from 'entities/User';
import { post } from 'shared/api/api';
import { CurrencyCode } from 'shared/const/common';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

interface RegistrationByEmailProps {
  username: string
  email: string
  password: string
  defaultCurrency: CurrencyCode
}

export const registrationByEmail = createAsyncThunk<
UserLoginResponseDto,
RegistrationByEmailProps
>('registration/registrationByEmail', async (authData, thunkAPI) => {
  try {
    const response = await post<UserLoginResponseDto>(
      'http://localhost:3000/auth/signup',
      authData
    );

    localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
    thunkAPI.dispatch(userActions.setAuthData(response.user));
    thunkAPI.dispatch(userActions.setIsAuth(true));
    thunkAPI.dispatch(userActions.setIsReg(true));

    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
