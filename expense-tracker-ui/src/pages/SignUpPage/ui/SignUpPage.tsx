import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SignUpPage.module.scss';
import { RegistrationFormAsync } from 'features/Registration';

interface SignUpPageProps {
  className?: string
}

const SignUpPage = ({ className }: SignUpPageProps) => {
  return (
    <div className={classNames(cls.SignUpPage, {}, [className])}>
      <RegistrationFormAsync/>
    </div>
  );
};

export default SignUpPage;
