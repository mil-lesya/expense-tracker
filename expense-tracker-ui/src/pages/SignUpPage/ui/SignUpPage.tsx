import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SignUpPage.module.scss';
import RegistrationForm from 'features/Registration/ui/RegistrationForm/RegistrationForm';

interface SignUpPageProps {
  className?: string
}

const SignUpPage = ({ className }: SignUpPageProps) => {
  return (
    <div className={classNames(cls.SignUpPage, {}, [className])}>
      <RegistrationForm/>
    </div>
  );
};

export default SignUpPage;
