import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserLoginResponseDto, userActions } from 'entities/User';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

interface RegistrationByEmailProps {
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

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
