import { StateSchema } from 'app/providers/StoreProvider';

export const getEditUserInfoIsLoading = (state: StateSchema) => state.editUserInfo?.isLoading;
export const getEditUserInfoError = (state: StateSchema) => state.editUserInfo?.error;
export const getEditUserInfoUsername = (state: StateSchema) => state.editUserInfo?.username;
export const getEditUserInfoDefaultCurrency = (state: StateSchema) => state.editUserInfo?.defaultCurrency;
export const getEditUserInfoEmail = (state: StateSchema) => state.editUserInfo?.email;
