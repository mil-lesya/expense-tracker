import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MobileMenu.module.scss';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

const MobileMenu: FC<MobileMenuProps> = (props) => {
  const { t } = useTranslation('authorized');
  const dispatch = useDispatch();

  const { isOpen, onClose, className } = props;

  const onLogoutClick = () => {
    dispatch(userActions.logout());
  };

  return (
    <div className={classNames(cls.mobileMenu, { [cls.open]: isOpen }, [className])}>
       <div className={classNames(cls.menuContent, { [cls.open]: isOpen }, [])} onClick={e => { e.stopPropagation(); }}>
        <button className={cls.closeButton} onClick={onClose}>
            <SvgIcon name='close' className={cls.closeButtonIcon} />
        </button>
        <ul className={cls.menuList}>
          <li className={cls.menuListItem}>
            <SvgIcon name='profile' />
            {t('profile')}
          </li>
          <li className={cls.menuListItem}>
            <SvgIcon name='settings' />
            {t('settings')}
          </li>
          <li onClick={onLogoutClick} className={cls.menuListItem}>
            <SvgIcon name='logout' />
            {t('logout')}
          </li>
        </ul>
      </div>
      <div className={cls.backdrop} onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
