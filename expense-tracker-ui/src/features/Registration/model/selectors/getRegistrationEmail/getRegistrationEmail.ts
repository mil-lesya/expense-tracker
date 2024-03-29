import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getRegistrationEmail = (state: StateSchema) => state?.registrationForm?.email || '';
