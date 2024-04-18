import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import Table from 'shared/ui/Table/Table';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { TransactionsTable, fetchTransactions, getTransactionsCount, getTransactionsCurrentPage, getTransactionsError, getTransactionsIsLoading, getTransactionsTotalPages, getUserTransactions, transactionsReducer } from 'entities/Transaction';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, walletsReducer } from 'entities/Wallet';
import Pagination from 'shared/ui/Pagination/Pagination';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';

const reducers: ReducersList = {
  wallets: walletsReducer,
  transactions: transactionsReducer
};
interface TransactionsPageProps {
  className?: string
}

const TransactionsPage: FC<TransactionsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('transactions');
  const dispatch = useAppDispatch();

  const transactionsCount = useSelector(getTransactionsCount);
  const totalPages = useSelector(getTransactionsTotalPages);
  const transactionsIsLoading = useSelector(getTransactionsIsLoading);
  // const currentPage = useSelector(getTransactionsCurrentPage);

  const [pageIndex, setPageIndex] = useState(1);
  const [countRecords, setCountRecords] = useState(10);

  useEffect(() => {
    dispatch(fetchWallets({ page: 1, limit: 100 }));
  }, []);

  useEffect(() => {
    dispatch(fetchTransactions({ page: pageIndex, limit: countRecords }));
  }, [pageIndex, countRecords]);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const onRowsPerPageChange = (numberOfRows: number) => {
    setCountRecords(numberOfRows);
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageHeader>{t('title')}</PageHeader>
      <div className={classNames(cls.transactionsPage, {}, [className])}>
      {transactionsIsLoading
        ? (<PageLoader></PageLoader>)
        : (
          <>
          {transactionsCount !== 0
            ? (
            <>
            <TransactionsTable />
            <Pagination
              count={transactionsCount}
              totalPages={totalPages}
              currentPage={pageIndex}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
            </>
              )
            : (<EmptyBlock>{t('emptyList')}</EmptyBlock>)
          }
          </>
          )
      }
      </div>
    </DynamicModuleLoader>
  );
};

export default TransactionsPage;
