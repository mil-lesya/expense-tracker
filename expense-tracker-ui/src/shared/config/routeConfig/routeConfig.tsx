import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.SIGNIN]: '/signin',
  [AppRoutes.SIGNUP]: '/signup',
  [AppRoutes.DASHBOARD]: '/dashboard',
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
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};
