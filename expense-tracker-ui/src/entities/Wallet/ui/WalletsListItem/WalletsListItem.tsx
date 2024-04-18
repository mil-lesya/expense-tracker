import { FC, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WalletsListItem.module.scss';
import { Wallet } from 'entities/Wallet/model/types/wallet';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';

interface WalletsListItemProps {
  wallet: Wallet
  onClickEdit: (wallet: Wallet) => void
  onClickDelete: (wallet: Wallet) => void
  className?: string
}

const WalletsListItem: FC<WalletsListItemProps> = (props) => {
  const { wallet, className, onClickEdit, onClickDelete } = props;

  const { t } = useTranslation('wallets');

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleDropdown = () => { setIsOpen(!isOpen); };

  // Контент выпадающего списка
  const dropdownContent = (
    <ul className={cls.dropdownMenu}>
      <li onClick={() => { onClickEdit(wallet); }}>{t('buttons.edit')}</li>
      <li onClick={() => { onClickDelete(wallet); }}>{t('buttons.delete')}</li>
    </ul>
  );

  return (
    <div
      className={classNames(cls.walletsListItem, {}, [className])}
      onMouseEnter={() => { setIsVisible(true); }}
      onMouseLeave={() => { setIsVisible(false); setIsOpen(false); }}
    >
      <div className={cls.infoWrapper}>
        <div className={cls.name}>{ wallet.name }</div>
        <div className={cls.balance}>{ wallet.isShowBalance ? wallet.balance : '*****' } { wallet.currency }</div>
      </div>

      <div className={cls.buttonWrapper}>
        {isVisible && (
          <Tippy
            content={dropdownContent}
            visible={isOpen}
            interactive
            reference={buttonRef}
            placement='bottom'
            offset={[0, -10]}
          >
            <div ref={buttonRef}>
            <Button theme={ThemeButton.CLEAR} onClick={toggleDropdown} className={cls.menuButton}>
                <SvgIcon name='menu-kebab' className={cls.menuButtonIcon} />
            </Button>
            </div>
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default WalletsListItem;
