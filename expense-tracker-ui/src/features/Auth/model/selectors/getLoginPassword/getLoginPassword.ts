import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || '';
