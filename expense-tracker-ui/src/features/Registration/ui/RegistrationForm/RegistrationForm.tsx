import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RegistrationForm.module.scss';
import Input from 'shared/ui/Input/ui/Input';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import PasswordInput from 'shared/ui/Input/ui/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getRegistrationState } from 'features/Registration/model/selectors/getRegistrationState/getRegistrationState';
import { registrationActions } from 'features/Registration/model/slice/registrationSlice';
import { registrationByEmail } from 'features/Registration/model/services/registrationByEmail/registrationByEmail';
import { EMAIL_MASK, PASSWORD_MASK, TEXT_MASK } from 'shared/const/mask';
import toast from 'react-hot-toast';

interface RegistrationFormProps {
  className?: string
}

const RegistrationForm = ({ className }: RegistrationFormProps) => {
  const dispatch = useDispatch();
  const { username, email, password, isLoading, error } = useSelector(getRegistrationState);
  const { t } = useTranslation('unauthorized');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (!username || !email ||
        !password || !repeatPassword ||
        usernameError || emailError ||
        passwordError || repeatPasswordError) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [usernameError, emailError, passwordError, repeatPasswordError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(registrationActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(registrationActions.setEmail(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(registrationActions.setPassword(value));
    },
    [dispatch]
  );

  const onRegistrationClick = useCallback(() => {
    dispatch(registrationByEmail({ username, email, password }));
  }, [dispatch, username, email, password]);

  const onChangeReapetPassword = (val: string) => {
    setRepeatPassword(val);
    if (password !== val) {
      setRepeatPasswordError(t('registration.repeatPasswordError'));
    } else {
      setRepeatPasswordError(null);
    }
  };

  return (
    <div className={classNames(cls.RegistrationForm, {}, [className])}>
      <h1 className={cls.title}>{t('registration.title')}</h1>
      <p className={cls.subtitle}>{t('registration.subtitle')}</p>
      <div className={cls.fields}>
        <Input
          value={username}
          onChange={onChangeUsername}
          mask={TEXT_MASK}
          required
          errorText={t('registration.usernameError')}
          error={usernameError}
          setError={setUsernameError}
          label={t('registration.username')}
          placeholder={t('registration.placeholderUsername')}
        />
        <Input
          value={email}
          onChange={onChangeEmail}
          mask={EMAIL_MASK}
          required
          errorText={t('registration.emailError')}
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
          errorText={t('registration.passwordError')}
          error={passwordError}
          setError={setPasswordError}
          label={t('registration.password')}
          placeholder={t('registration.placeholderPassword')}
        />
        <PasswordInput
          value={repeatPassword}
          onChange={onChangeReapetPassword}
          required
          error={repeatPasswordError}
          setError={setRepeatPasswordError}
          label={t('registration.repeatPassword')}
          placeholder={t('registration.placeholderRepeatPassword')}
        />
      </div>
      <Button
        onClick={onRegistrationClick}
        theme={ThemeButton.PRIMARY}
        disabled={isLoading || disabledBtn}
        loading={isLoading}
        className={cls.loginButton}
      >
        {t('registration.button')}
      </Button>
    </div>
  );
};

export default memo(RegistrationForm);
