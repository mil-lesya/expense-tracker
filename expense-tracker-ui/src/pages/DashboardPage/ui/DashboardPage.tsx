import { FC, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DashboardPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { PageLoader } from 'shared/ui/PageLoader';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ThemeWalletsTotalBalance, WalletsTotalBalance, getWalletsTotalBalanceIsLoading } from 'widgets/WalletsTotalBalance';
import { useSelector } from 'react-redux';
import { AddTransactionForm } from 'features/AddTransaction';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, getWalletsIsLoading, walletsReducer } from 'entities/Wallet';
import { categoryReducer, fetchCategory } from 'entities/Category';
import { TransactionsTable, fetchTransactions, getTransactionsCount, getTransactionsIsLoading, transactionsReducer } from 'entities/Transaction';
import { WalletsWidget } from 'widgets/WalletsWidget';
import { EmptyBlock } from 'shared/ui/EmptyBlock';

const reducers: ReducersList = {
  wallets: walletsReducer,
  transactions: transactionsReducer,
  category: categoryReducer
};
interface DashboardPageProps {
  className?: string
}

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('dashboard');
  const dispatch = useAppDispatch();

  const isLoadingWallets = useSelector(getWalletsIsLoading);
  const isLoadingTransactions = useSelector(getTransactionsIsLoading);
  const transactionsCount = useSelector(getTransactionsCount);

  useEffect(() => {
    dispatch(fetchWallets({ page: 1, limit: 100 }));
    dispatch(fetchCategory());
    dispatch(fetchTransactions({ page: 1, limit: 10, sort: 'date', order: 'ASC' }));
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageHeader>{t('title')}</PageHeader>
      <div className={classNames(cls.dashboardPage, {}, [className])}>
        {isLoadingWallets || isLoadingTransactions
          ? (
          <PageLoader />
            )
          : (
          <>
          <div className={cls.leftBlock}>
            <WalletsTotalBalance theme={ThemeWalletsTotalBalance.DARK} />
            <WalletsWidget />
          </div>
          <div className={cls.rightBlock}>
            <AddTransactionForm />
            <div className={cls.tableWrapper}>
              <h2 className={cls.title}>{t('titleTransactions')}</h2>
              {transactionsCount > 0
                ? (
                <TransactionsTable isPanel />
                  )
                : (
                <EmptyBlock>{t('emptyTransaction')}</EmptyBlock>
                  )}
            </div>
          </div>
        </>
            )}
        </div>
    </DynamicModuleLoader>
  );
};

export default DashboardPage;
