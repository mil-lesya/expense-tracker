import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
  path: string
  icon: string
  text: string
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath[AppRoutes.DASHBOARD],
    icon: 'dashboard',
    text: 'dashboard'
  },
  {
    path: RoutePath[AppRoutes.SAVINGS],
    icon: 'savings',
    text: 'savings'
  },
  {
    path: RoutePath[AppRoutes.TRANSACTIONS],
    icon: 'transaction',
    text: 'transactions'
  },
  {
    path: RoutePath[AppRoutes.BUDGETS],
    icon: 'budget',
    text: 'budgets'
  },
  {
    path: RoutePath[AppRoutes.WALLETS],
    icon: 'wallet',
    text: 'wallets'
  },
  {
    path: RoutePath[AppRoutes.REPORTS],
    icon: 'reports',
    text: 'reports'
  }
];
