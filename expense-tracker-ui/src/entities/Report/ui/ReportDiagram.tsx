import { FC, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReportDiagram.module.scss';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { useSelector } from 'react-redux';
import { getReportsCurrency, getReportsPeriod, getReportsTotalBalance, getReportsType } from '../model/selectors/reports';
import { ChartData, ExpenseItem } from '../model/types/report';
import { getUserReports } from '../model/slice/reportsSlice';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { prepareChartData } from '../model/utils/prepareChartData';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReportDiagramProps {
  className?: string
  loading?: boolean
}

const ReportDiagram: FC<ReportDiagramProps> = (props) => {
  const { loading } = props;

  const chartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [originalChartData, setOriginalChartData] = useState<ChartData>(); // Храним оригинальные данные
  const [displayChartData, setDisplayChartData] = useState<ChartData>(); // Данные для отображения, изменяются при наведении
  const [expenses, setExpenses] = useState<ExpenseItem[]>();

  const { t, i18n } = useTranslation(['reports', 'category']);

  const reportType = useSelector(getReportsType);
  const reportTotalBalance = useSelector(getReportsTotalBalance);
  const reportCurrency = useSelector(getReportsCurrency);
  const reportData = useSelector(getUserReports.selectAll);
  const reportPeriod = useSelector(getReportsPeriod);

  useEffect(() => {
    if (reportData.length > 0) {
      const { chartData, expenses } = prepareChartData(reportData);
      setOriginalChartData(chartData);
      setDisplayChartData(chartData);
      setExpenses(expenses);
    }
  }, [reportData]);

  useEffect(() => {
    if (originalChartData && expenses && activeIndex !== null && activeIndex < expenses.length) {
      const newData = JSON.parse(JSON.stringify(originalChartData)); // Создаем глубокую копию данных

      // Увеличиваем размер данных и изменяем цвет для активного сегмента
      newData.datasets[0].data[activeIndex] *= 1.1;
      newData.datasets[0].backgroundColor[activeIndex] = expenses[activeIndex].hoverColor;

      setDisplayChartData(newData);
    } else {
      // Возвращаем оригинальные данные, если нет активного индекса
      setDisplayChartData(originalChartData);
    }
  }, [activeIndex, originalChartData, expenses]);

  // Функция для изменения данных диаграммы и установки выделения
  const updateHighlight = (index: number | null) => {
    if (index !== null && index >= 0 && index < expenses.length) {
      // Проверка на то, что индекс находится в допустимых пределах и элемент существует
      displayChartData.datasets[0].backgroundColor[index] = displayChartData.datasets[0].hoverBackgroundColor[index];
    } else {
      // Восстановление исходных цветов
      displayChartData.datasets[0].backgroundColor = displayChartData.datasets[0].backgroundColor.map((color, i) => expenses[i].color);
    }
    setActiveIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    if (chartRef.current) {
      chartRef.current.setActiveElements([{ datasetIndex: 0, index }]);
      chartRef.current.tooltip.setActiveElements([{ datasetIndex: 0, index }], {
        x: 0, y: 0
      });
      chartRef.current.update();
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    if (chartRef.current) {
      chartRef.current.setActiveElements([]);
      chartRef.current.tooltip.setActiveElements([], { x: 0, y: 0 });
      chartRef.current.update();
    }
  };

  return (
    <>
    {loading || !reportPeriod
      ? <PageLoader />
      : (
        <>
        {reportTotalBalance === 0
          ? (
            <EmptyBlock>{t('chart.empty')}</EmptyBlock>
            )
          : (
            <div className={cls.chartComponentWrapper}>
        <h3 className={cls.chartTitle}>{t('chart.title')}</h3>
        <div className={cls.chartComponent}>
        <div className={cls.doughnutChartWrapper}>
            <div className={cls.chartWrapper}>
                <div className={cls.chartInfo}>
                    <p className={cls.chartInfoTitle}>{t(`chart.total.${reportType}`)}</p>
                    <p className={cls.chartInfoTotal}>{Math.round(reportTotalBalance * 100) / 100} {reportCurrency}</p>
                    <p className={cls.chartInfoDate}>{formatDate(reportPeriod.startDate, reportPeriod.endDate)}</p>
                </div>
                {displayChartData && displayChartData.labels.length > 0
                  ? (
                    <Doughnut
                    ref={chartRef}
                    className={cls.doughnutChart}
                    data={displayChartData}
                    options={{
                      cutout: '85%',
                      plugins: {
                        tooltip: {
                          callbacks: {
                            title: function (tooltipItems: Array<TooltipItem<'doughnut'>>) {
                              return i18n.exists(`category:${tooltipItems[0].label}`) ? t(`category:${tooltipItems[0].label}`) : tooltipItems[0].label;
                            },
                            label: function (tooltipItem: TooltipItem<'doughnut'>) {
                              const percentage = (tooltipItem.parsed / reportTotalBalance * 100).toFixed(2) + '%';
                              return percentage;
                            }
                          }
                        },
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
                    )
                  : (<></>)}
        </div>
        </div>
        <ul className={cls.labelList}>
            <li className={classNames(cls.labelItem, {}, [cls.labelItemHeader])}>
                <div className={cls.labelContent}>
                    <span>{t(`chart.category.${reportType}`)}, %</span>
                    <span>{t('chart.amount')}</span>
                </div>
            </li>
            {expenses && expenses.length > 0
              ? (
                <>
                {expenses.map((item, index) => (
                    <li
                        key={item.category}
                        className={cls.labelItem}
                        style={{ backgroundColor: activeIndex === index ? item.hoverColor : '' }}
                        onMouseEnter={() => { handleMouseEnter(index); }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span
                            className={cls.labelColor}
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <div className={cls.labelContent}>
                            <div className={cls.categoryWrapper}>
                                <span className={cls.categoryName}>{i18n.exists(`category:${item.category}`) ? t(`category:${item.category}`) : item.category}</span>
                                <span className={cls.percent}>{(item.amount / reportTotalBalance * 100).toFixed(2) + '%'}</span>
                            </div>
                            <span className={cls.amount}>{reportType === 'expense' ? '' : '+'}{item.amount} {reportCurrency}</span>
                        </div>
                    </li>))}
                </>
                )
              : (<></>)}
            <li className={classNames(cls.labelItem, {}, [cls.labelItemFooter])}>
                <div className={cls.labelContent}>
                    <span className={cls.totalText}>{t(`chart.total.${reportType}`)}</span>
                    <span className={cls.totalBalance}>{reportType === 'expense' ? '' : '+'}{Math.round(reportTotalBalance * 100) / 100} {reportCurrency}</span>
                </div>
            </li>
        </ul>
      </div>
      </div>
            )}
              </>
        )}
    </>
  );
};

export default ReportDiagram;
