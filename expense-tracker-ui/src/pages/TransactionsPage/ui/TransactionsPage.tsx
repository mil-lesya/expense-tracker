import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import Table from 'shared/ui/Table/Table';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Transaction, TransactionsTable, fetchTransactions, getTransactionsCount, getTransactionsCurrentPage, getTransactionsError, getTransactionsIsLoading, getTransactionsTotalPages, getUserTransactions, transactionsActions, transactionsReducer } from 'entities/Transaction';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, walletsReducer } from 'entities/Wallet';
import Pagination from 'shared/ui/Pagination/Pagination';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { DeleteTransactionModal } from 'features/DeleteTransaction';
import { EditTransactionModal } from 'features/EditTransaction';
import { categoryReducer, fetchCategory } from 'entities/Category';
import { getTransactionsLimit } from 'entities/Transaction/model/selectors/transactions';

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
  const limit = useSelector(getTransactionsLimit);
  const currentPage = useSelector(getTransactionsCurrentPage);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  const [isEditModal, setIsEditModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchWallets({ page: 1, limit: 100 }));
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    dispatch(fetchTransactions({ page: currentPage, limit }));
  }, [currentPage, limit]);

  const onPageChange = (page: number) => {
    dispatch(transactionsActions.setCurrentPage(page));
  };

  const onRowsPerPageChange = (numberOfRows: number) => {
    dispatch(transactionsActions.setLimit(numberOfRows));
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
              countRecords={limit}
              count={transactionsCount}
              totalPages={totalPages}
              currentPage={Number(currentPage)}
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
        currentPage={currentPage}
        limit={limit}
      />
      <EditTransactionModal
        isOpen={isEditModal}
        onClose={onToggleEditModal}
        transaction={editTransaction}
        currentPage={currentPage}
        limit={limit}
      />
    </DynamicModuleLoader>
  );
};

export default TransactionsPage;
