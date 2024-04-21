import { SelectOption } from 'shared/ui/Select/ui/Select';

export function transformToSelectOptions<T> (
  items: T[],
  valueKey: keyof T,
  contentKey: keyof T,
  iconKey?: keyof T
): SelectOption[] {
  return items.map(item => ({
    value: String(item[valueKey]), // Преобразование значения в строку
    content: item[contentKey], // Использование значения как есть, ожидается, что это будет string или number
    icon: iconKey ? String(item[iconKey]) : undefined // Преобразование значения иконки в строку, если ключ указан
  }));
}
