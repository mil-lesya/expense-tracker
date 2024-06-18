import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLoginResponseDto, userActions } from 'entities/User';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { post } from 'shared/api/api';

interface LoginByEmailProps {
  email: string
  password: string
}

export const loginByEmail = createAsyncThunk<
UserLoginResponseDto,
LoginByEmailProps
>('login/loginByEmail', async (authData, thunkAPI) => {
  try {
    const response = await post<UserLoginResponseDto>(
      'http://localhost:3000/auth/login',
      authData
    );

    localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
    thunkAPI.dispatch(userActions.setAuthData(response.user));
    thunkAPI.dispatch(userActions.setIsAuth(true));

    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
