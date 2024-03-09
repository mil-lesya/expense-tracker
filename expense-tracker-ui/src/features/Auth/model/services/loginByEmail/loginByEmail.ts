import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserLoginResponseDto, userActions } from 'entities/User';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { loginActions } from '../../slice/loginSlice';

interface LoginByEmailProps {
  email: string
  password: string
}

export const loginByEmail = createAsyncThunk<
UserLoginResponseDto,
LoginByEmailProps
>('login/loginByEmail', async (authData, thunkAPI) => {
  try {
    const response = await axios.post<UserLoginResponseDto>(
      'http://localhost:3000/auth/login',
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
    thunkAPI.dispatch(userActions.setAuthData(response.data.user));
    thunkAPI.dispatch(userActions.setIsAuth(true));

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
