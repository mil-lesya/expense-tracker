import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getRegistrationState = (state: StateSchema) => state?.registrationForm;
