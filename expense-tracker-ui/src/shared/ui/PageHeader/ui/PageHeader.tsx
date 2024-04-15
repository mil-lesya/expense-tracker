import { FC, ReactNode, memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageHeader.module.scss';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useMediaWidth } from 'shared/lib/hooks/useMediaWidth';
import { MOBILE_SIZE } from 'shared/const/windowSizes';

interface PageHeaderProps {
  className?: string
  children: ReactNode
}

const PageHeader: FC<PageHeaderProps> = (props) => {
  const { className, children } = props;
  const { currentStyle } = useMediaWidth();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (currentStyle === MOBILE_SIZE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentStyle]);

  return (
    <div className={classNames(cls.pageHeader, {}, [className])}>
        {isMobile ? <></> : <SvgIcon name='header-container' />}
       <h1 className={cls.headerText}>{children}</h1>
    </div>
  );
};

export default memo(PageHeader);
