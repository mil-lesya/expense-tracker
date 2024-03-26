import { BudgetsPage } from 'pages/BudgetsPage';
import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ReportsPage } from 'pages/ReportsPage';
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
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};
