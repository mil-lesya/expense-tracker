import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AuthorizedLayout.module.scss';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { Button, ThemeButton } from 'shared/ui/Button';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageContainer } from 'shared/ui/PageContainer';

interface AuthorizedLayoutProps {
  className?: string
}

const AuthorizedLayout: FC<AuthorizedLayoutProps> = (props) => {
  const { className, children } = props;
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div className={classNames(cls.AuthorizedLayout, {}, [className])}>
       <Sidebar></Sidebar>
       <Navbar></Navbar>
       <div className={cls.pageWrapper}>
        <PageContainer>
          {children}
        </PageContainer>
        </div>
       {/* <Button theme={ThemeButton.PRIMARY} onClick={onClickLogout}>logout</Button> */}
    </div>
  );
};

export default AuthorizedLayout;
