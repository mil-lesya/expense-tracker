import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Transaction, TransactionsTable, fetchTransactions, getTransactionsCount, getTransactionsLimit, getTransactionsCurrentPage, getTransactionsIsLoading, getTransactionsTotalPages, transactionsActions, transactionsReducer } from 'entities/Transaction';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, walletsReducer } from 'entities/Wallet';
import Pagination from 'shared/ui/Pagination/Pagination';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { DeleteTransactionModal } from 'features/DeleteTransaction';
import { EditTransactionModal } from 'features/EditTransaction';
import { categoryReducer, fetchCategory } from 'entities/Category';
import Input from 'shared/ui/Input/ui/Input';
import DatePicker, { ThemeDatePicker } from 'shared/ui/DatePicker/DatePicker';
import dayjs from 'dayjs';
import { FilterTransactions } from 'widgets/FilterTransactions';

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

  const [search, setSearch] = useState('');
  const [dateStart, setDateStart] = useState(dayjs().startOf('month').toISOString());
  const [dateEnd, setDateEnd] = useState(null);
  const [filterTypeTransaction, setFilterTypeTransaction] = useState<string>();
  const [filterCategory, setFilterCategory] = useState<string>();
  const [filterWallets, setFilterWallets] = useState<string>();
  const [filterMinAmount, setFilterMinAmount] = useState<string>();

  useEffect(() => {
    dispatch(fetchWallets({ page: 1, limit: 100 }));
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    dispatch(fetchTransactions({
      page: currentPage,
      limit,
      search: search || undefined,
      startDate: dateStart,
      endDate: dateEnd || undefined,
      type: filterTypeTransaction,
      wallet: filterWallets,
      minAmount: filterMinAmount,
      category: filterCategory
    }));
  }, [currentPage, limit, search, dateStart, dateEnd, filterTypeTransaction, filterWallets, filterMinAmount, filterCategory]);

  const onPageChange = (page: number) => {
    dispatch(transactionsActions.setCurrentPage(page));
  };

  const onRowsPerPageChange = (numberOfRows: number) => {
    dispatch(transactionsActions.setLimit(numberOfRows));
    onPageChange(1);
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

  const onChangeSearch = (val: string) => {
    setSearch(val);
  };

  const handleDateChange = (range: { startDate: Date, endDate: Date }) => {
    const start = new Date(range.startDate).toISOString();
    const end = new Date(range.endDate).toISOString();
    setDateStart(start);
    setDateEnd(end);
  };

  const onFiltersChange = (filters: { type?: string, category?: string, wallet?: string, minAmount?: string, maxAmount?: string }) => {
    setFilterTypeTransaction(filters.type);
    setFilterWallets(filters.wallet);
    setFilterMinAmount(filters.minAmount);
    setFilterCategory(filters.category);
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageHeader>{t('title')}</PageHeader>
      <div className={classNames(cls.transactionsPage, {}, [className])}>
        <div className={cls.searchBlock}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('placeholderSearch')}
            className={cls.searchField}
          />
          <DatePicker
            initialDate={dateStart}
            onDateChange={handleDateChange}
            range
            theme={ThemeDatePicker.DARK}
          />
        </div>
        <div className={cls.contentWrapper}>
          <div>
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
          <FilterTransactions onFiltersChange={onFiltersChange} />
        </div>
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
