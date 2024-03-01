import { ReducersMapObject } from './../../../../../node_modules/redux/index.d'
import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    preloadedState: initialState,
  })
}
