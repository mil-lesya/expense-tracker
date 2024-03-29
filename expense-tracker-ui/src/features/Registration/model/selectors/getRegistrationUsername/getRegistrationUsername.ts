import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getRegistrationUsername = (state: StateSchema) => state?.registrationForm?.username || '';
