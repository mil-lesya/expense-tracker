import { FC, memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState, userActions } from 'entities/User';
import Tippy from '@tippyjs/react';
import { useMediaWidth } from 'shared/lib/hooks/useMediaWidth';
import { MOBILE_SIZE } from 'shared/const/windowSizes';
import { Logo } from 'shared/ui/Logo';
import { MobileMenu } from 'widgets/MobileMenu';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string
}

const Navbar: FC<NavbarProps> = (props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const { authData } = useSelector(getUserState);
  const { currentStyle } = useMediaWidth();
  const { t } = useTranslation('authorized');

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    if (currentStyle === MOBILE_SIZE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentStyle]);

  // Функция для переключения состояния открытия/закрытия выпадающего списка
  const toggleDropdown = () => { setIsOpen(!isOpen); };

  const onLogoutClick = () => {
    dispatch(userActions.logout());
  };

  // Контент выпадающего списка
  const dropdownContent = (
    <ul className={cls.dropdownMenu}>
      <li onClick={() => {}}>{t('profile')}</li>
      <li onClick={onLogoutClick}>{t('logout')}</li>
    </ul>
  );

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      {isMobile
        ? (
          <>
            <Logo withoutText></Logo>
            <button className={cls.menuButton} onClick={() => { setIsOpenMenu(true); }}>
              <SvgIcon name='menu-burger' />
            </button>
          </>
          )
        : (
          <Tippy
            content={dropdownContent}
            visible={isOpen}
            onClickOutside={() => { setIsOpen(false); }}
            interactive
          >
            <button className={classNames(cls.dropdownButton, { [cls.open]: isOpen }, [])} onClick={toggleDropdown}>
              {authData.username}
              <span className={classNames(cls.arrow, { [cls.open]: isOpen }, [])}></span>
            </button>
          </Tippy>
          )}
          <MobileMenu isOpen={isOpenMenu} onClose={() => { setIsOpenMenu(false); }}></MobileMenu>
    </div>
  );
};

export default memo(Navbar);
