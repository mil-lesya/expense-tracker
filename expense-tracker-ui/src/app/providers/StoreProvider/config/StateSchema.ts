import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { BudgetSchema } from 'entities/Budget';
import { CategorySchema } from 'entities/Category';
import { GoalSchema } from 'entities/Goal';
import { LimitSchema } from 'entities/Limit/model/types/limit';
import { ReportSchema } from 'entities/Report';
import { TransactionSchema } from 'entities/Transaction';
import { UserSchema } from 'entities/User';
import { WalletSchema } from 'entities/Wallet';
import { AddEditBudgetSchema } from 'features/AddEditBudget';
import { AddEditGoalSchema } from 'features/AddEditGoal';
import { AddEditLimitSchema } from 'features/AddEditLimit';
import { AddEditWalletSchema } from 'features/AddEditWallet';
import { AddTransactionSchema } from 'features/AddTransaction';
import { LoginSchema } from 'features/Auth';
import { ChangeDepositedAmountGoalSchema } from 'features/ChangeDepositedAmountGoal';
import { DeleteBudgetSchema } from 'features/DeleteBudget';
import { DeleteGoalSchema } from 'features/DeleteGoal';
import { DeleteLimitSchema } from 'features/DeleteLimit';
import { DeleteTransactionSchema } from 'features/DeleteTransaction';
import { DeleteWalletSchema } from 'features/DeleteWallet';
import { EditTransactionSchema } from 'features/EditTransaction';
import { EditUserInfoSchema } from 'features/EditUserInfo';
import { ForgetPasswordSchema } from 'features/ForgetPassword/model/types/forgetPasswordSchema';
import { RegistrationSchema } from 'features/Registration';
import { ResetPasswordSchema } from 'features/ResetPassword/model/types/resetPasswordSchema';
import { ConfirmSchema } from 'pages/ConfirmPage/model/types/confirmSchema';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';
import { AxiosRequestInterface } from 'shared/api/api';
import { WalletsTotalBalanceSchema } from 'widgets/WalletsTotalBalance';

export interface StateSchema {
  user: UserSchema
  // Асинхронные редьюсеры
  editUserInfo?: EditUserInfoSchema
  loginForm?: LoginSchema
  registrationForm?: RegistrationSchema
  forgetPasswordForm?: ForgetPasswordSchema
  resetPasswordForm?: ResetPasswordSchema
  confirm?: ConfirmSchema
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
  addEditBudget?: AddEditBudgetSchema
  deleteBudget?: DeleteBudgetSchema
  // Лимиты
  limits?: LimitSchema
  addEditLimit?: AddEditLimitSchema
  deleteLimit?: DeleteLimitSchema
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
  get: <TResponse = any, TParams = any>(
    url: string,
    config?: AxiosRequestInterface<TParams>
  ) => Promise<TResponse>
  post: <TResponse = any, TRequest = any, TParams = any>(
    url: string,
    requestBody: TRequest,
    config?: AxiosRequestInterface<TParams>
  ) => Promise<TResponse>
  put: <TResponse = any, TRequest = any, TParams = any>(
    url: string,
    requestBody: TRequest,
    config?: AxiosRequestInterface<TParams>
  ) => Promise<TResponse>
  patch: <TResponse = any, TRequest = any, TParams = any>(
    url: string,
    requestBody: TRequest,
    config?: AxiosRequestInterface<TParams>
  ) => Promise<TResponse>
  delete: <TResponse = any, TParams = any>(
    url: string,
    config?: AxiosRequestInterface<TParams>
  ) => Promise<TResponse>
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
