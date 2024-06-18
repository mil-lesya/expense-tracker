import { FC, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ResetPasswordPage.module.scss';
import { Loader } from 'shared/ui/Loader';
import { ResetPasswordForm } from 'features/ResetPassword';

interface ResetPasswordPageProps {
  className?: string
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.forgetPasswordPage, {}, [className])}>
      <Suspense fallback={<Loader />}>
          <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
