import dayjs from 'dayjs';

export function formatDate (startDate: string, endDate: string) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // Форматируем даты, включая год, если он отличается
  const startFormat = start.format('D MMM YYYY');
  const endFormat = end.format('D MMM YYYY');

  // Проверяем, отличаются ли года начала и конца
  if (start.year() !== end.year()) {
    return `${startFormat} - ${endFormat}`;
  } else {
    // Если год одинаковый, выводим год только один раз
    const sameYearFormat = start.format('D MMM') + ' - ' + end.format('D MMM YYYY');
    return sameYearFormat;
  }
}
