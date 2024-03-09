import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AuthorizedLayout.module.scss';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { Button, ThemeButton } from 'shared/ui/Button';

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
       <div>Auth Layout</div>
       <div className={cls.pageWrapper}>{children}</div>
       <Button theme={ThemeButton.PRIMARY} onClick={onClickLogout}>logout</Button>
    </div>
  );
};

export default AuthorizedLayout;
