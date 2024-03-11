import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { jwtDecode } from 'jwt-decode';

interface decodedToken {
  id: string
}

export const initAuthData = createAsyncThunk<User>(
  'user/initAuthData',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      const decoded: decodedToken | null = token ? jwtDecode(token) : null;

      if (token && decoded?.id) {
        const response = await axios.get<User>(
          `http://localhost:3000/users/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.data) {
          thunkAPI.dispatch(userActions.setIsAuth(false));
          throw new Error();
        }

        thunkAPI.dispatch(userActions.setAuthData(response.data));
        thunkAPI.dispatch(userActions.setIsAuth(true));

        return response.data;
      } else {
        thunkAPI.dispatch(userActions.setIsAuth(false));
        throw new Error();
      }
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  }
);
