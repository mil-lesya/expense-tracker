import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserLoginResponseDto, userActions } from 'entities/User';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

interface RegistrationByEmailProps {
  username: string
  email: string
  password: string
}

export const registrationByEmail = createAsyncThunk<
UserLoginResponseDto,
RegistrationByEmailProps
>('registration/registrationByEmail', async (authData, thunkAPI) => {
  try {
    const response = await axios.post<UserLoginResponseDto>(
      'http://localhost:3000/auth/signup',
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
    return thunkAPI.rejectWithValue(e.message);
  }
});
