import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SignInPage.module.scss';
import { LoginFormAsync } from 'features/Auth';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader';

interface SignInPageProps {
  className?: string
}

const SignInPage = ({ className }: SignInPageProps) => {
  return (
    <div className={classNames(cls.signInPage, {}, [className])}>
      <Suspense fallback={<Loader />}>
          <LoginFormAsync />
      </Suspense>
    </div>
  );
};

export default SignInPage;
