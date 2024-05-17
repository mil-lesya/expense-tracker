type GenericObject = Record<string, any>;

export function toFormData<T extends GenericObject> (data: T): FormData {
  const formData = new FormData();

  // Рекурсивная функция для добавления данных в FormData
  const appendFormData = (key: string, value: any) => {
    // Если значение null или undefined, не добавляем его в FormData
    if (value === null || value === undefined) return;

    // Если значение - объект File, добавляем его как файл
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object' && !(value instanceof Date)) {
      for (const subKey in value) {
        appendFormData(`${key}[${subKey}]`, value[subKey]);
      }
    } else {
      formData.append(key, value);
    }
  };

  // Итерируем ключи и значения объекта
  Object.keys(data).forEach(key => {
    appendFormData(key, data[key]);
  });

  return formData;
}
