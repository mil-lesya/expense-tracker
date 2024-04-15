import { FC, ReactNode, memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useMediaWidth } from 'shared/lib/hooks/useMediaWidth';
import { LAPTOP_SIZE, MOBILE_SIZE, TABLET_SIZE } from 'shared/const/windowSizes';
import { useTranslation } from 'react-i18next';

interface SidebarItemProps {
  to: string
  icon: string
  isActive: boolean
  onClick: () => void
  text: string
  className?: string
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { to, icon, isActive, onClick, className, text } = props;

  const { t } = useTranslation('authorized');

  const { currentStyle } = useMediaWidth();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (currentStyle === MOBILE_SIZE || currentStyle === TABLET_SIZE || currentStyle === LAPTOP_SIZE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentStyle]);

  return (
    <Link to={to} onClick={onClick} className={classNames(cls.sidebarItem, { [cls.active]: isActive }, [className])}>
       <SvgIcon name={icon} />
       {isMobile ? <></> : t(text)}
    </Link>
  );
};

export default memo(SidebarItem);
