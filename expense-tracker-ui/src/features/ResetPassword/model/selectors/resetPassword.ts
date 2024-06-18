import { StateSchema } from 'app/providers/StoreProvider';

export const getResetPasswordIsLoading = (state: StateSchema) => state.resetPasswordForm?.isLoading;
export const getResetPasswordError = (state: StateSchema) => state.resetPasswordForm?.error;
export const getResetPasswordPass = (state: StateSchema) => state.resetPasswordForm?.password;
