import { StateSchema } from 'app/providers/StoreProvider';

export const getForgetPasswordIsLoading = (state: StateSchema) => state.forgetPasswordForm?.isLoading;
export const getForgetPasswordError = (state: StateSchema) => state.forgetPasswordForm?.error;
export const getForgetPasswordEmail = (state: StateSchema) => state.forgetPasswordForm?.email;
