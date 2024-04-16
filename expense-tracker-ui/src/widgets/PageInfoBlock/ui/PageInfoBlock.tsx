import { FC, ReactNode, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageInfoBlock.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';

interface PageInfoBlockProps {
  children: ReactNode
  buttonText: string
  onClick: () => void
}

const PageInfoBlock: FC<PageInfoBlockProps> = (props) => {
  const { children, buttonText, onClick } = props;

  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cls.pageInfoBlock}>
      <div className={cls.infoBlock}>
        <p className={classNames(cls.info, { [cls.expanded]: isExpanded }, [])}>
            {children}
        </p>
        <button onClick={toggleIsExpanded} className={cls.readMoreBtn}>
            {t(isExpanded ? 'buttons.readLess' : 'buttons.readMore')}
        </button>
      </div>
      <Button theme={ThemeButton.PRIMARY} onClick={onClick} className={cls.btn}>{buttonText}</Button>
    </div>
  );
};

export default memo(PageInfoBlock);
