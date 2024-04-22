import { StateSchema } from 'app/providers/StoreProvider';

export const getReportsIsLoading = (state: StateSchema) => state.reports?.isLoading;
export const getReportsError = (state: StateSchema) => state.reports?.error;
export const getReportsType = (state: StateSchema) => state.reports?.type;
export const getReportsTotalBalance = (state: StateSchema) => state.reports?.totalBalance;
export const getReportsCurrency = (state: StateSchema) => state.reports?.currency;
export const getReportsWallets = (state: StateSchema) => state.reports?.wallets;
export const getReportsCategories = (state: StateSchema) => state.reports?.categories;
export const getReportsPeriod = (state: StateSchema) => state.reports?.period;
