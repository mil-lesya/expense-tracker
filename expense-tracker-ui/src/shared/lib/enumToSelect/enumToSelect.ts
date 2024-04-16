import { CurrencyCode } from 'shared/const/common';
import { SelectOption } from 'shared/ui/Select/ui/Select';

export function enumToSelectOptions<E> (e: E): SelectOption[] {
  return Object.values(e).map(value => ({
    value,
    content: value.charAt(0).toUpperCase() + value.slice(1) // Капитализируем первую букву для отображения
  }));
}

export const currencyOptions = enumToSelectOptions(CurrencyCode);
