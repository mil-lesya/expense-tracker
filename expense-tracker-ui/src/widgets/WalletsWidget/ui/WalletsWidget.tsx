import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WalletsWidget.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getWalletsIsShowOnPanel } from 'entities/Wallet';

interface WalletsWidgetProps {
  className?: string
}

const WalletsWidget: FC<WalletsWidgetProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation('dashboard');

  const wallets = useSelector(getWalletsIsShowOnPanel);

  return (
    <div className={classNames(cls.walletsWidget, {}, [className])}>
       <p className={cls.title}>{t('walletsTitle')}</p>
       <div className={cls.wallets}>
       {wallets.map((wallet) => (
        <div
            key={wallet.id}
            className={cls.walletWrapper}
        >
            <p className={cls.walletName}>{wallet.name}</p>
            <p className={cls.walletBalance}>{wallet.balance} {wallet.currency}</p>
        </div>
       ))}
       </div>
    </div>
  );
};

export default WalletsWidget;
