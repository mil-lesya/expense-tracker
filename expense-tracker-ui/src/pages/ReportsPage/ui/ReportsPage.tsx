import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReportsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { ReportDiagram, ReportType } from 'entities/Report';
import { FilterReports } from 'widgets/FilterReports';

interface ReportsPageProps {
  className?: string
}

const ReportsPage: FC<ReportsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('reports');

  const [type, setType] = useState<ReportType>('expense');

  return (
    <>
      <PageHeader>{t('title')}</PageHeader>
      <div className={classNames(cls.reportsPage, {}, [className])}>
        <div className={cls.titleWrapper}>
          <h2 className={cls.title}>{t(`subtitle.${type}`)}</h2>
          <div className={cls.controlsWrapper}>
            <Button theme={ThemeButton.GREY} active={type === 'expense'} onClick={() => { setType('expense'); }}>{t('buttons.expense')}</Button>
            <Button theme={ThemeButton.GREY} active={type === 'income'} onClick={() => { setType('income'); }}>{t('buttons.income')}</Button>
            <Button theme={ThemeButton.GREY} active={type === 'expense,income'} onClick={() => { setType('expense,income'); }}>{t('buttons.expenseAndIncome')}</Button>
          </div>
        </div>
        <FilterReports type={type} />
        <ReportDiagram />
      </div>
    </>
  );
};

export default ReportsPage;
