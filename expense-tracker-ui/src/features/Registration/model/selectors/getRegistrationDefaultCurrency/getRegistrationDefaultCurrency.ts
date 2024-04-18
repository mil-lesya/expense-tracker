import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { CurrencyCode } from 'shared/const/common';

export const getRegistrationDefaultCurrency = (state: StateSchema) => state?.registrationForm?.defaultCurrency || CurrencyCode.USD;
