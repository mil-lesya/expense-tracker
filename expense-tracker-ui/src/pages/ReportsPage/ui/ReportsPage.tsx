import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReportsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { ReportDiagram, ReportType, fetchReport, getReportsCategories, getReportsIsLoading, getReportsPeriod, getReportsType, getReportsWallets, reportsActions } from 'entities/Report';
import { FilterReports } from 'widgets/FilterReports';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, getWalletsIsLoading, walletsReducer } from 'entities/Wallet';
import { categoryReducer, fetchCategory, getCategoriesIsLoading } from 'entities/Category';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { PageLoader } from 'shared/ui/PageLoader';
import dayjs from 'dayjs';
import { reportsReducer } from 'entities/Report/model/slice/reportsSlice';

const initialReducers: ReducersList = {
  wallets: walletsReducer,
  category: categoryReducer,
  reports: reportsReducer
};

interface ReportsPageProps {
  className?: string
}

const ReportsPage: FC<ReportsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('reports');
  const dispatch = useAppDispatch();

  const walletsIsLoading = useSelector(getWalletsIsLoading);
  const categoryIsLoading = useSelector(getCategoriesIsLoading);
  const reportIsLoading = useSelector(getReportsIsLoading);
  const reportType = useSelector(getReportsType);
  const walletsId = useSelector(getReportsWallets);
  const categoryId = useSelector(getReportsCategories);
  const period = useSelector(getReportsPeriod);

  useEffect(() => {
    dispatch(fetchWallets({}));
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (period && reportType) {
      dispatch(fetchReport({
        startDate: period.startDate,
        endDate: period.endDate,
        type: reportType,
        category: categoryId === 'all' ? undefined : categoryId,
        wallet: walletsId === 'all' ? undefined : walletsId
      }));
    }
  }, [period, walletsId, categoryId, reportType]);

  useEffect(() => {
    dispatch(reportsActions.setWallets(''));
    dispatch(reportsActions.setCategories(''));
    dispatch(reportsActions.setPeriod({ startDate: dayjs().startOf('month').toISOString(), endDate: dayjs().toISOString() }));
  }, [reportType]);

  const onChangeReportType = useCallback(
    (value: ReportType) => {
      dispatch(reportsActions.setType(value));
    },
    [dispatch]
  );

  const onChangeWallets = useCallback(
    (value: string) => {
      dispatch(reportsActions.setWallets(value));
    }, [dispatch]);

  const onChangeCategories = useCallback(
    (value: string) => {
      dispatch(reportsActions.setCategories(value));
    }, [dispatch]);

  const onChangePeriod = useCallback(
    (startDate: string, endDate: string) => {
      dispatch(reportsActions.setPeriod({ startDate, endDate }));
    }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <PageHeader>{t('title')}</PageHeader>
      <div className={classNames(cls.reportsPage, {}, [className])}>
        {walletsIsLoading || categoryIsLoading
          ? <PageLoader/>
          : (
          <>
          <div className={cls.titleWrapper}>
            <h2 className={cls.title}>{t(`subtitle.${reportType}`)}</h2>
            <div className={cls.controlsWrapper}>
              <Button theme={ThemeButton.GREY} active={reportType === 'expense'} onClick={() => { onChangeReportType('expense'); }}>{t('buttons.expense')}</Button>
              <Button theme={ThemeButton.GREY} active={reportType === 'income'} onClick={() => { onChangeReportType('income'); }}>{t('buttons.income')}</Button>
              {/* <Button theme={ThemeButton.GREY} active={reportType === 'expense,income'} onClick={() => { onChangeReportType('expense,income'); }}>{t('buttons.expenseAndIncome')}</Button> */}
            </div>
          </div>
          <FilterReports
            type={reportType}
            onChangeWallets={onChangeWallets}
            onChangeCategories={onChangeCategories}
            onChangeDate={onChangePeriod}
          />
          <ReportDiagram loading={reportIsLoading} />
          </>
            )}
      </div>
    </DynamicModuleLoader>
  );
};

export default ReportsPage;
