import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getRegistrationError = (state: StateSchema) => state?.registrationForm?.error || null;
