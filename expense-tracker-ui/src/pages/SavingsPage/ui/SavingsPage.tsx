import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SavingsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface SavingsPageProps {
  className?: string
}

const SavingsPage: FC<SavingsPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Savings</PageHeader>
      <div className={classNames(cls.savingsPage, {}, [className])}>
        <p>savingsPage</p>
      </div>
    </>
  );
};

export default SavingsPage;
