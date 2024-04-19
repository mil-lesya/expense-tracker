import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsTable.module.scss';
import { useSelector } from 'react-redux';
import { getUserTransactions } from 'entities/Transaction/model/slice/transactionSlice';
import dayjs from 'dayjs';
import { Transaction, TransactionType } from 'entities/Transaction/model/types/transaction';
import { useTranslation } from 'react-i18next';
import { Category } from 'entities/Category';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Table from 'shared/ui/Table/Table';
import { Wallet } from 'entities/Wallet';
import { getWalletsEntities } from 'entities/Wallet/model/selectors/wallets';
import { CurrencyCode } from 'shared/const/common';
import Tippy from '@tippyjs/react';

interface AmountType {
  sum: string
  currency: CurrencyCode
  type: TransactionType
}

interface ActionsType {
  onEditTransaction: () => void
  onDeleteTransaction: () => void
}

interface TransactionsTableProps {
  className?: string
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

const TransactionsTable: FC<TransactionsTableProps> = (props) => {
  const { className, onEdit, onDelete } = props;

  const { t } = useTranslation('transactions');

  const wallets = useSelector(getWalletsEntities);

  const transactions = useSelector(getUserTransactions.selectAll);

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
        const actions: ActionsType = {
          onEditTransaction: () => {
            onEdit(transaction);
          },
          onDeleteTransaction: () => {
            onDelete(transaction);
          }
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
          title: t('table.columnDate'),
          render: (date: string) => {
            return (
                <span className={cls.date}>{date}</span>
            );
          }
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
                <span className={cls.category}><SvgIcon name={category.icon} />{category.name}</span>
            );
          }
        },
        {
          key: 'description',
          title: t('table.columnDescription'),
          render: (description: string) => {
            return (
                <span className={cls.description}>{description}</span>
            );
          }
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
          render: (actions: ActionsType) => {
            return (
              <Tippy
                content={(
                  <ul className={cls.dropdownMenu}>
                    <li onClick={() => { actions.onEditTransaction(); }}>{t('buttons.edit')}</li>
                    <li onClick={() => { actions.onDeleteTransaction(); }}>{t('buttons.delete')}</li>
                  </ul>
                )}
                interactive
                trigger='click'
                placement='bottom'
              >
              <div className={cls.actions}><SvgIcon name='menu-kebab'></SvgIcon></div>
            </Tippy>
            );
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
