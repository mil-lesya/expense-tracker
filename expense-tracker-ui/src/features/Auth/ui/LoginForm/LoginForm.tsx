import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import Input from 'shared/ui/Input/ui/Input';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import PasswordInput from 'shared/ui/Input/ui/PasswordInput';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { useTranslation } from 'react-i18next';
import { EMAIL_MASK, PASSWORD_MASK } from 'shared/const/mask';
import toast from 'react-hot-toast';
import { getLoginEmail } from 'features/Auth/model/selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from 'features/Auth/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from 'features/Auth/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from 'features/Auth/model/selectors/getLoginError/getLoginError';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

export interface LoginFormProps {
  className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const email = useSelector(getLoginEmail);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const { t } = useTranslation('unauthorized');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    if (!email || !password ||
        emailError || passwordError) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [email, password, emailError, passwordError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByEmail({ email, password }));
  }, [dispatch, email, password]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.loginForm, {}, [className])}>
        <h1 className={cls.title}>{t('login.title')}</h1>
        <p className={cls.subtitle}>{t('login.subtitle')}</p>
        <div className={cls.fields}>
          <Input
            value={email}
            onChange={onChangeEmail}
            mask={EMAIL_MASK}
            required
            errorText={t('login.emailError')}
            error={emailError}
            setError={setEmailError}
            label='Email'
            placeholder='example@mail.com'
          />
          <PasswordInput
            value={password}
            onChange={onChangePassword}
            mask={PASSWORD_MASK}
            required
            errorText={t('login.passwordError')}
            error={passwordError}
            setError={setPasswordError}
            label={t('login.password')}
            placeholder={t('login.placeholderPassword')}
          />
        </div>
        <Button
          onClick={onLoginClick}
          theme={ThemeButton.PRIMARY}
          disabled={isLoading || disabledBtn}
          loading={isLoading}
          className={cls.loginButton}
        >
          {t('login.button')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(LoginForm);
