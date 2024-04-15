import { FC, ReactNode, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EmptyBlock.module.scss';

interface EmptyBlockProps {
  children: ReactNode
  className?: string
}

const EmptyBlock: FC<EmptyBlockProps> = (props) => {
  const { className, children } = props;

  return (
    <div className={classNames(cls.emptyBlock, {}, [className])}>
       <h2 className={cls.text}>{children}</h2>
    </div>
  );
};

export default memo(EmptyBlock);
