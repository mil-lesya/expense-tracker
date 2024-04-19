import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import Table from 'shared/ui/Table/Table';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Transaction, TransactionsTable, fetchTransactions, getTransactionsCount, getTransactionsCurrentPage, getTransactionsError, getTransactionsIsLoading, getTransactionsTotalPages, getUserTransactions, transactionsReducer } from 'entities/Transaction';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, walletsReducer } from 'entities/Wallet';
import Pagination from 'shared/ui/Pagination/Pagination';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { DeleteTransactionModal } from 'features/DeleteTransaction';
import { EditTransactionModal } from 'features/EditTransaction';
import { categoryReducer, fetchCategory } from 'entities/Category';

const reducers: ReducersList = {
  wallets: walletsReducer,
  transactions: transactionsReducer,
  category: categoryReducer
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

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  const [isEditModal, setIsEditModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchWallets({ page: 1, limit: 100 }));
    dispatch(fetchCategory());
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

  const onEditTransaction = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setIsEditModal(true);
  };

  const onDeleteTransaction = (transaction: Transaction) => {
    setDeleteTransaction(transaction);
    setIsDeleteModal(true);
  };

  const onToggleDeleteModal = () => {
    setIsDeleteModal(prev => !prev);
  };

  const onToggleEditModal = () => {
    setIsEditModal(prev => !prev);
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
            <TransactionsTable
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
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

      <DeleteTransactionModal
        isOpen={isDeleteModal}
        onClose={onToggleDeleteModal}
        transaction={deleteTransaction}
        currentPage={pageIndex}
        limit={countRecords}
      />
      <EditTransactionModal
        isOpen={isEditModal}
        onClose={onToggleEditModal}
        transaction={editTransaction}
        currentPage={pageIndex}
        limit={countRecords}
      />
    </DynamicModuleLoader>
  );
};

export default TransactionsPage;
