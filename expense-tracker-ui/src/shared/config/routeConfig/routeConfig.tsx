import { BudgetsPage } from 'pages/BudgetsPage';
import { ConfirmPage } from 'pages/ConfirmPage';
import { DashboardPage } from 'pages/DashboardPage';
import { ForgetPasswordPage } from 'pages/ForgetPasswordPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ReportsPage } from 'pages/ReportsPage';
import { ResetPasswordPage } from 'pages/ResetPasswordPage';
import { SavingsPage } from 'pages/SavingsPage';
import { SettingsPage } from 'pages/SettingsPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { TransactionsPage } from 'pages/TransactionsPage';
import { WalletsPage } from 'pages/WalletsPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard',
  SAVINGS = 'savings',
  TRANSACTIONS = 'transactions',
  BUDGETS = 'budgets',
  WALLETS = 'wallets',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  FORGET_PASSWORD = 'forget_password',
  RESET_PASSWORD = 'reset_password',
  CONFIRM = 'confirm',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.SIGNIN]: '/signin',
  [AppRoutes.SIGNUP]: '/signup',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.SAVINGS]: '/savings',
  [AppRoutes.TRANSACTIONS]: '/transactions',
  [AppRoutes.BUDGETS]: '/budgets',
  [AppRoutes.WALLETS]: '/wallets',
  [AppRoutes.REPORTS]: '/reports',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.FORGET_PASSWORD]: '/forget-password',
  [AppRoutes.RESET_PASSWORD]: '/reset-password',
  [AppRoutes.CONFIRM]: '/confirm',
  [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.SIGNIN]: {
    path: RoutePath.signin,
    element: <SignInPage />
  },
  [AppRoutes.SIGNUP]: {
    path: RoutePath.signup,
    element: <SignUpPage />
  },
  [AppRoutes.DASHBOARD]: {
    path: RoutePath.dashboard,
    element: <DashboardPage />
  },
  [AppRoutes.SAVINGS]: {
    path: RoutePath.savings,
    element: <SavingsPage />
  },
  [AppRoutes.TRANSACTIONS]: {
    path: RoutePath.transactions,
    element: <TransactionsPage />
  },
  [AppRoutes.BUDGETS]: {
    path: RoutePath.budgets,
    element: <BudgetsPage />
  },
  [AppRoutes.WALLETS]: {
    path: RoutePath.wallets,
    element: <WalletsPage />
  },
  [AppRoutes.REPORTS]: {
    path: RoutePath.reports,
    element: <ReportsPage />
  },
  [AppRoutes.SETTINGS]: {
    path: RoutePath.settings,
    element: <SettingsPage />
  },
  [AppRoutes.FORGET_PASSWORD]: {
    path: RoutePath.forget_password,
    element: <ForgetPasswordPage />
  },
  [AppRoutes.RESET_PASSWORD]: {
    path: RoutePath.reset_password,
    element: <ResetPasswordPage />
  },
  [AppRoutes.CONFIRM]: {
    path: RoutePath.confirm,
    element: <ConfirmPage />
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};
