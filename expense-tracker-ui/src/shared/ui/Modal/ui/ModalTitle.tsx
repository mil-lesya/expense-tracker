import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';

interface ModalTitleProps {
  title: string
  subtitle: string
  className?: string
}

const ModalTitle: FC<ModalTitleProps> = (props) => {
  const { title, subtitle, className } = props;

  return (
    <div className={classNames(cls.modalTitle, {}, [className])}>
       <h2 className={cls.titleText}>{title}</h2>
       <p className={cls.subtitleText}>{subtitle}</p>
    </div>
  );
};

export default memo(ModalTitle);
