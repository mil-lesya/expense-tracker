import { ReducersMapObject } from './../../../../../node_modules/redux/index.d';
import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/Auth';
import { registrationReducer } from 'features/Registration';

export function createReduxStore (initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
    registrationForm: registrationReducer
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    preloadedState: initialState
  });
}
