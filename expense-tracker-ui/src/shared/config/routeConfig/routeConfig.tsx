import { SignInPage } from 'pages/SignInPage'
import { SignUpPage } from 'pages/SignUpPage'
import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.SIGNIN]: '/signin',
  [AppRoutes.SIGNUP]: '/signup',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.SIGNIN]: {
    path: RoutePath.signin,
    element: <SignInPage />,
  },
  [AppRoutes.SIGNUP]: {
    path: RoutePath.signup,
    element: <SignUpPage />,
  },
}
