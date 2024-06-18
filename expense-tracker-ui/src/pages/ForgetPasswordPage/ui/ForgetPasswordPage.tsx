import { FC, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ForgetPasswordPage.module.scss';
import { ForgetPasswordForm } from 'features/ForgetPassword';
import { Loader } from 'shared/ui/Loader';

interface ForgetPasswordPageProps {
  className?: string
}

const ForgetPasswordPage: FC<ForgetPasswordPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.forgetPasswordPage, {}, [className])}>
      <Suspense fallback={<Loader />}>
          <ForgetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ForgetPasswordPage;
