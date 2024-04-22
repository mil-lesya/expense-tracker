import { FC, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReportDiagram.module.scss';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface ChartData {
  labels: string[]
  datasets: Array<{
    data: number[]
    backgroundColor: string[]
    hoverBackgroundColor: string[]
    hoverOffset: number
  }>
}

export interface ExpenseItem {
  category: string
  amount: number
  color: string
  hoverColor: string
}

interface ReportDiagramProps {
  className?: string
}

const data: ChartData = {
  labels: ['Bills', 'Food', 'Entertainment', 'Transport', 'Pet', 'Charity', 'Clothing', 'Eating out', 'Gifts', 'Home'],
  datasets: [
    {
      data: [2250, 1620, 902, 880, 846, 840, 765, 607, 459, 258], // Эти значения должны соответствовать вашим данным
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CB3F', '#50AF95', '#FD7D7C', '#68B3C8'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CB3F', '#50AF95', '#FD7D7C', '#68B3C8'].map(color => `${color}B3`), // добавьте прозрачность для эффекта наведения
      hoverOffset: 10
    }
  ]
};

// Создание элементов списка с категориями и суммами расходов
const expenses: ExpenseItem[] = data.labels.map((label, index) => ({
  category: label,
  amount: data.datasets[0].data[index],
  color: data.datasets[0].backgroundColor[index],
  hoverColor: data.datasets[0].hoverBackgroundColor[index]
}));

const ReportDiagram: FC<ReportDiagramProps> = (props) => {
  const chartRef = useRef<ChartJS<'doughnut', number[], unknown>>(null as any);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    const newData = JSON.parse(JSON.stringify(data)); // Создаем глубокую копию данных

    if (activeIndex !== null) {
      // Увеличиваем размер данных и изменяем цвет для активного сегмента
      newData.datasets[0].data[activeIndex] *= 1.1; // Увеличиваем размер на 10%
      newData.datasets[0].backgroundColor[activeIndex] = expenses[activeIndex].hoverColor; // Изменяем цвет на более яркий
    } else {
      // Восстанавливаем оригинальные цвета
      newData.datasets[0].backgroundColor = data.datasets[0].backgroundColor.map((color, index) => expenses[index].color);
    }

    setChartData(newData); // Обновляем состояние диаграммы
  }, [activeIndex, data, expenses]);

  // Функция для изменения данных диаграммы и установки выделения
  const updateHighlight = (index: number | null) => {
    if (index !== null && index >= 0 && index < expenses.length) {
      // Проверка на то, что индекс находится в допустимых пределах и элемент существует
      chartData.datasets[0].backgroundColor[index] = chartData.datasets[0].hoverBackgroundColor[index];
    } else {
      // Восстановление исходных цветов
      chartData.datasets[0].backgroundColor = chartData.datasets[0].backgroundColor.map((color, i) => expenses[i].color);
    }
    setActiveIndex(index);
  };

  return (
      <div className={cls.chartComponent}>
        <div className={cls.doughnutChartWrapper}>
            <div className={cls.chartWrapper}>
                <div className={cls.chartInfo}>
                    <p className={cls.chartInfoTitle}>Total expenses</p>
                    <p className={cls.chartInfoTotal}>-9 155,00 USD</p>
                    <p className={cls.chartInfoDate}>1 Jan - 31 Dec, 2023</p>
                </div>
                <Doughnut
                ref={chartRef}
                className={cls.doughnutChart}
                data={chartData}
                options={{
                  cutout: '85%',
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  onHover: (event, chartElement, chart) => {
                    if (chartElement.length && chartElement[0]) {
                      updateHighlight(chartElement[0].index);
                    } else {
                      updateHighlight(null);
                    }
                  },
                  animation: {
                    animateScale: true
                  }
                }}
                />
        </div>
        </div>
        <ul className={cls.labelList}>
        {expenses.map((item, index) => (
            <li
            key={item.category}
            className={cls.labelItem}
            style={{ backgroundColor: activeIndex === index ? item.hoverColor : '' }}
            onMouseEnter={() => { setActiveIndex(index); }}
            onMouseLeave={() => { setActiveIndex(null); }}
            >
              <span
                className={cls.labelColor}
                style={{ backgroundColor: item.color }}
              ></span>
              <div className={cls.labelContent}>{item.category}<span>-{item.amount.toLocaleString()}</span></div>
            </li>))}
        </ul>
      </div>
  );
};

export default ReportDiagram;
