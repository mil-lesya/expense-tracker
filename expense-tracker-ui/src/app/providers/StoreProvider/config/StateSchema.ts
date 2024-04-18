import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TransactionSchema } from 'entities/Transaction';
import { UserSchema } from 'entities/User';
import { WalletSchema } from 'entities/Wallet';
import { AddEditWalletSchema } from 'features/AddEditWallet';
import { LoginSchema } from 'features/Auth';
import { DeleteWalletSchema } from 'features/DeleteWallet';
import { RegistrationSchema } from 'features/Registration';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';
import { WalletsTotalBalanceSchema } from 'widgets/WalletsTotalBalance';

export interface StateSchema {
  user: UserSchema
  // Асинхронные редьюсеры
  loginForm?: LoginSchema
  registrationForm?: RegistrationSchema
  // Кошельки
  wallets?: WalletSchema
  addEditWallet?: AddEditWalletSchema
  deleteWallet?: DeleteWalletSchema
  walletsTotalBalance?: WalletsTotalBalanceSchema
  // Транзакции
  transactions?: TransactionSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWidthManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
