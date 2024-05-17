import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { BudgetSchema } from 'entities/Budget';
import { CategorySchema } from 'entities/Category';
import { GoalSchema } from 'entities/Goal';
import { ReportSchema } from 'entities/Report';
import { TransactionSchema } from 'entities/Transaction';
import { UserSchema } from 'entities/User';
import { WalletSchema } from 'entities/Wallet';
import { AddEditGoalSchema } from 'features/AddEditGoal';
import { AddEditWalletSchema } from 'features/AddEditWallet';
import { AddTransactionSchema } from 'features/AddTransaction';
import { LoginSchema } from 'features/Auth';
import { ChangeDepositedAmountGoalSchema } from 'features/ChangeDepositedAmountGoal';
import { DeleteGoalSchema } from 'features/DeleteGoal';
import { DeleteTransactionSchema } from 'features/DeleteTransaction';
import { DeleteWalletSchema } from 'features/DeleteWallet';
import { EditTransactionSchema } from 'features/EditTransaction';
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
  addTransaction?: AddTransactionSchema
  deleteTransaction?: DeleteTransactionSchema
  editTransaction?: EditTransactionSchema
  // Категории
  category?: CategorySchema
  // Аналитика
  reports?: ReportSchema
  // Бюджеты
  budgets?: BudgetSchema
  // Цели
  goals?: GoalSchema
  addEditGoal?: AddEditGoalSchema
  deleteGoal?: DeleteGoalSchema
  changeDepositedAmountGoal?: ChangeDepositedAmountGoalSchema
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
