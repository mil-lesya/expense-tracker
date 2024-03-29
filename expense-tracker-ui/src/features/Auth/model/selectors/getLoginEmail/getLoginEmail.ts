import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLoginEmail = (state: StateSchema) => state?.loginForm?.email || '';
