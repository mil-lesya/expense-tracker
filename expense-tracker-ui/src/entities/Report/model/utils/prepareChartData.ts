import { generateRandomColor } from 'shared/lib/generateRandomColor/generateRandomColor';
import { ChartData, ExpenseItem, Report } from '../types/report';

export function prepareChartData (response: Report[]): { chartData: ChartData, expenses: ExpenseItem[] } {
  // Извлекаем категории и соответствующие им суммы
  const categories = response.map(report => report.category.name);
  const amounts = response.map(report => Math.round(report.amount * 100) / 100);

  // Генерируем случайные цвета для каждой категории
  const backgroundColors = categories.map(() => generateRandomColor());
  const hoverBackgroundColors = backgroundColors.map(color => `${color}B3`); // добавляем прозрачность

  // Создаем объекты для диаграммы
  const chartData: ChartData = {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: backgroundColors,
      hoverBackgroundColor: hoverBackgroundColors,
      hoverOffset: 10
    }]
  };

  // Создаем массив объектов для каждой категории расходов
  const expenses: ExpenseItem[] = chartData.labels.map((label, index) => ({
    category: label,
    amount: chartData.datasets[0].data[index],
    color: chartData.datasets[0].backgroundColor[index],
    hoverColor: chartData.datasets[0].hoverBackgroundColor[index]
  }));

  return { chartData, expenses };
}
