import { FC } from 'react';
import cls from './PageLoader.module.scss';
import { Loader } from 'shared/ui/Loader';

interface PageLoaderProps {
  className?: string
}

const PageLoader: FC<PageLoaderProps> = (props) => {
  return (
    <div className={cls.pageLoader}>
       <Loader></Loader>
    </div>
  );
};

export default PageLoader;
