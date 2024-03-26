import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Logo } from 'shared/ui/Logo';
import SidebarItem from './SidebarItem';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useMediaWidth } from 'shared/hooks/useMediaWidth';
import { LAPTOP_SIZE, MOBILE_SIZE, TABLET_SIZE } from 'shared/const/windowSizes';

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('authorized');
  const { currentStyle } = useMediaWidth();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);

  useEffect(() => {
    switch (currentStyle) {
      case MOBILE_SIZE:
        setIsMobile(true);
        break;
      case TABLET_SIZE:
        setIsTablet(true);
        break;
      case LAPTOP_SIZE:
        setIsLaptop(true);
        break;
      default:
        setIsMobile(false);
        setIsTablet(false);
        setIsLaptop(false);
    }
  }, [currentStyle]);

  const handleItemClick = (path: string) => {
    setActiveItem(path);
  };

  return (
    <div className={classNames(cls.sidebar, {}, [className])}>
       {(isMobile || isTablet) ? <></> : <Logo withoutText={isLaptop} />}
       <div className={cls.links}>
        <div className={cls.topLinks}>
            <SidebarItem
              to={RoutePath[AppRoutes.DASHBOARD]}
              icon='dashboard'
              isActive={RoutePath[AppRoutes.DASHBOARD] === activeItem}
              onClick={() => { handleItemClick(RoutePath[AppRoutes.DASHBOARD]); }}
            >
              {t('dashboard')}
            </SidebarItem>
            <SidebarItem
              to={RoutePath[AppRoutes.SAVINGS]}
              icon='savings'
              isActive={RoutePath[AppRoutes.SAVINGS] === activeItem}
              onClick={() => { handleItemClick(RoutePath[AppRoutes.SAVINGS]); }}
            >
              {t('savings')}
            </SidebarItem>
            <SidebarItem
              to={RoutePath[AppRoutes.TRANSACTIONS]}
              icon='transaction'
              isActive={RoutePath[AppRoutes.TRANSACTIONS] === activeItem}
              onClick={() => { handleItemClick(RoutePath[AppRoutes.TRANSACTIONS]); }}
            >
              {t('transactions')}
            </SidebarItem>
            <SidebarItem
              to={RoutePath[AppRoutes.BUDGETS]}
              icon='budget'
              isActive={RoutePath[AppRoutes.BUDGETS] === activeItem}
              onClick={() => { handleItemClick(RoutePath[AppRoutes.BUDGETS]); }}
            >
              {t('budgets')}
            </SidebarItem>
            <SidebarItem
              to={RoutePath[AppRoutes.WALLETS]}
              icon='wallet'
              isActive={RoutePath[AppRoutes.WALLETS] === activeItem}
              onClick={() => { handleItemClick(RoutePath[AppRoutes.WALLETS]); }}
            >
              {t('wallets')}
            </SidebarItem>
            <SidebarItem
              to={RoutePath[AppRoutes.REPORTS]}
              icon='reports'
              isActive={RoutePath[AppRoutes.REPORTS] === activeItem}
              onClick={() => { handleItemClick(RoutePath[AppRoutes.REPORTS]); }}
            >
              {t('reports')}
            </SidebarItem>
        </div>
        {isMobile
          ? <></>
          : (
          <div className={cls.bottomLinks}>
              <SidebarItem
                to={RoutePath[AppRoutes.SETTINGS]}
                icon='settings'
                isActive={RoutePath[AppRoutes.SETTINGS] === activeItem}
                onClick={() => { handleItemClick(RoutePath[AppRoutes.SETTINGS]); }}
              >
                {t('settings')}
              </SidebarItem>
          </div>
            )}
       </div>
    </div>
  );
};
