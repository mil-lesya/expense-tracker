import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import Input from 'shared/ui/Input/ui/Input';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import PasswordInput from 'shared/ui/Input/ui/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { useTranslation } from 'react-i18next';
import { EMAIL_MASK, PASSWORD_MASK } from 'shared/const/mask';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
  const dispatch = useDispatch();
  const { email, password, isLoading } = useSelector(getLoginState);
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
  );
};

export default memo(LoginForm);
