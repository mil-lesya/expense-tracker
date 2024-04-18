import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsTable.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector, useStore } from 'react-redux';
import { getUserTransactions } from 'entities/Transaction/model/slice/transactionSlice';
import { getTransactionsError, getTransactionsIsLoading } from 'entities/Transaction/model/selectors/transactions';
import { fetchTransactions } from 'entities/Transaction/model/services/fetchTransactions';
import dayjs from 'dayjs';
import { Transaction, TransactionType } from 'entities/Transaction/model/types/transaction';
import { useTranslation } from 'react-i18next';
import { Category } from 'entities/Category';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Table from 'shared/ui/Table/Table';
import { Wallet, getUserWallets } from 'entities/Wallet';
import { ReduxStoreWidthManager } from 'app/providers/StoreProvider';
import { getWalletsEntities } from 'entities/Wallet/model/selectors/wallets';
import { CurrencyCode } from 'shared/const/common';

interface AmountType {
  sum: string
  currency: CurrencyCode
  type: TransactionType
}

interface TransactionsTableProps {
  className?: string
}

const TransactionsTable: FC<TransactionsTableProps> = (props) => {
  const { className } = props;
  // const dispatch = useAppDispatch();
  const { t } = useTranslation('transactions');

  const wallets = useSelector(getWalletsEntities);

  const transactions = useSelector(getUserTransactions.selectAll);
  // const isLoading = useSelector(getTransactionsIsLoading);
  // const error = useSelector(getTransactionsError);

  const [prepareData, setPrepareData] = useState([]);
  const [prepareColumns, setPrepareColumns] = useState([]);

  useEffect(() => {
    if (Object.keys(transactions).length > 0 && Object.keys(wallets).length > 0) {
      const dataForTable = transactions.map((transaction) => {
        const date = dayjs(transaction.date).format('DD MMM YYYY');
        const wallet = wallets[transaction.walletId];
        const amount = {
          sum: transaction.amount,
          currency: transaction.currency,
          type: transaction.type
        };
        const actions = {
          onEditTransaction: () => {},
          onDeleteTransaction: () => {}
        };

        return {
          date,
          wallet,
          amount,
          category: transaction.category,
          description: transaction.description,
          actions
        };
      });

      setPrepareData(dataForTable);
      setPrepareColumns([
        {
          key: 'date',
          title: t('table.columnDate')
        },
        {
          key: 'wallet',
          title: t('table.columnWallet'),
          render: (wallet: Wallet) => {
            return (
                <span>{wallet.name}</span>
            );
          }
        },
        {
          key: 'category',
          title: t('table.columnCategory'),
          render: (category: Category) => {
            if (!category) {
              return <></>;
            }
            return (
                <span><SvgIcon name={category.icon} />{category.name}</span>
            );
          }
        },
        {
          key: 'description',
          title: t('table.columnDescription')
        },
        {
          key: 'amount',
          title: t('table.columnAmount'),
          render: (amount: AmountType) => {
            return (
                <span>{amount.type === 'income' ? '+' : '-'}{amount.sum} {amount.currency}</span>
            );
          }
        },
        {
          key: 'actions',
          title: '',
          render: () => {
            return <SvgIcon name='menu-kebab'></SvgIcon>;
          }
        }
      ]);
    }
  }, [transactions, wallets]);

  return (
    <div className={classNames(cls.transactionsTable, {}, [className])}>
      {prepareData.length > 0 && (
        <Table data={prepareData} columns={prepareColumns} />
      )}
    </div>
  );
};

export default TransactionsTable;
