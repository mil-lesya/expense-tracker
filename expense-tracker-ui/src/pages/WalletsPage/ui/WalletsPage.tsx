import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WalletsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface WalletsPageProps {
  className?: string
}

const WalletsPage: FC<WalletsPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Wallets</PageHeader>
      <div className={classNames(cls.walletsPage, {}, [className])}>
        <p>walletsPage</p>
      </div>
    </>
  );
};

export default WalletsPage;
