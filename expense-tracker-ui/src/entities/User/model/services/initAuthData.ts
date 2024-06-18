import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { jwtDecode } from 'jwt-decode';
import { get } from 'shared/api/api';

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
        const response = await get<User>(
          `http://localhost:3000/users/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response) {
          thunkAPI.dispatch(userActions.setIsAuth(false));
          throw new Error();
        }

        thunkAPI.dispatch(userActions.setAuthData(response));
        thunkAPI.dispatch(userActions.setIsAuth(true));

        return response;
      } else {
        thunkAPI.dispatch(userActions.setIsAuth(false));
        throw new Error();
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
