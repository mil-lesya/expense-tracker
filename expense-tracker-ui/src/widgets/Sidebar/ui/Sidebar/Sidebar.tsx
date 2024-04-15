import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Logo } from 'shared/ui/Logo';
import SidebarItem from '../SdebarItem/SidebarItem';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMediaWidth } from 'shared/lib/hooks/useMediaWidth';
import { LAPTOP_SIZE, MOBILE_SIZE, TABLET_SIZE } from 'shared/const/windowSizes';
import { SidebarItemsList } from '../../model/items';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { className } = props;

  const { currentStyle } = useMediaWidth();
  const { t } = useTranslation('authorized');
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
          {SidebarItemsList.map((item) => (
            <SidebarItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              text={item.text}
              isActive={item.path === activeItem}
              onClick={() => { handleItemClick(item.path); }}
            >
            </SidebarItem>
          ))}
        </div>
        {isMobile
          ? <></>
          : (
          <div className={cls.bottomLinks}>
              <SidebarItem
                to={RoutePath[AppRoutes.SETTINGS]}
                icon='settings'
                text={t('settings')}
                isActive={RoutePath[AppRoutes.SETTINGS] === activeItem}
                onClick={() => { handleItemClick(RoutePath[AppRoutes.SETTINGS]); }}
              >
              </SidebarItem>
          </div>
            )}
       </div>
    </div>
  );
};
