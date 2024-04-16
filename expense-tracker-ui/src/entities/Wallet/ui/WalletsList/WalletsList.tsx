import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WalletsList.module.scss';
import { Wallet } from 'entities/Wallet/model/types/wallet';
import WalletsListItem from '../WalletsListItem/WalletsListItem';

interface WalletsListProps {
  wallets: Wallet[]
  onClickEdit: (wallet: Wallet) => void
  onClickDelete: (wallet: Wallet) => void
  className?: string
}

const WalletsList: FC<WalletsListProps> = (props) => {
  const { className, wallets, onClickEdit, onClickDelete } = props;

  return (
    <div className={classNames(cls.walletsList, {}, [className])}>
       { wallets.map((item) => (
        <WalletsListItem
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            key={item.id}
            wallet={item}
        />
       )) }
    </div>
  );
};

export default WalletsList;
