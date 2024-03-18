import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getUserState = (state: StateSchema) => state?.user;
