import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getRegistrationIsLoading = (state: StateSchema) => state?.registrationForm?.isLoading || false;
