import { ReduxStoreWidthManager, StateSchema, ThunkConfig } from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import StoreProvider from './ui/StoreProvider';

export {
  StoreProvider,
  createReduxStore,
  type ReduxStoreWidthManager,
  type AppDispatch,
  type StateSchema,
  type ThunkConfig
};
