import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TransactionsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface TransactionsPageProps {
  className?: string
}

const TransactionsPage: FC<TransactionsPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Transactions</PageHeader>
      <div className={classNames(cls.transactionsPage, {}, [className])}>
        <p>transactionsPage</p>
      </div>
    </>
  );
};

export default TransactionsPage;
