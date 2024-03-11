import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import notFoundImg from 'shared/assets/img/404.jpg';

interface NotFoundPageProps {
  className?: string
}

const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
       <img src={notFoundImg} className={cls.background}></img>
    </div>
  );
};

export default NotFoundPage;
