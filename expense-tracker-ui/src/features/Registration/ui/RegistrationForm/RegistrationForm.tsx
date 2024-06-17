import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RegistrationForm.module.scss';
import Input from 'shared/ui/Input/ui/Input';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import PasswordInput from 'shared/ui/Input/ui/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { registrationActions, registrationReducer } from '../../model/slice/registrationSlice';
import { registrationByEmail } from '../../model/services/registrationByEmail/registrationByEmail';
import { EMAIL_MASK, PASSWORD_MASK, TEXT_MASK } from 'shared/const/mask';
import toast from 'react-hot-toast';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { getRegistrationUsername } from '../../model/selectors/getRegistrationUsername/getRegistrationUsername';
import { getRegistrationEmail } from '../../model/selectors/getRegistrationEmail/getRegistrationEmail';
import { getRegistrationPassword } from '../../model/selectors/getRegistrationPassword/getRegistrationPassword';
import { getRegistrationIsLoading } from '../../model/selectors/getRegistrationIsLoading/getRegistrationIsLoading';
import { getRegistrationError } from '../../model/selectors/getRegistrationError/getRegistrationError';
import { useMediaWidth } from 'shared/lib/hooks/useMediaWidth';
import { MOBILE_SIZE } from 'shared/const/windowSizes';
import { useNavigate } from 'react-router-dom';
import Select from 'shared/ui/Select/ui/Select';
import { currencyOptions } from 'shared/lib/enumToSelect/enumToSelect';
import { getRegistrationDefaultCurrency } from '../../model/selectors/getRegistrationDefaultCurrency/getRegistrationDefaultCurrency';
import { CurrencyCode } from 'shared/const/common';

const initialReducers: ReducersList = {
  registrationForm: registrationReducer
};

export interface RegistrationFormProps {
  className?: string
}

const RegistrationForm = ({ className }: RegistrationFormProps) => {
  const { t } = useTranslation('unauthorized');
  const dispatch = useDispatch();
  const { currentStyle } = useMediaWidth();
  const navigate = useNavigate();

  const username = useSelector(getRegistrationUsername);
  const email = useSelector(getRegistrationEmail);
  const password = useSelector(getRegistrationPassword);
  const defaultCurrency = useSelector(getRegistrationDefaultCurrency);
  const isLoading = useSelector(getRegistrationIsLoading);
  const error = useSelector(getRegistrationError);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (currentStyle === MOBILE_SIZE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentStyle]);

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

  const onChangeDefaultCurrency = useCallback(
    (value: CurrencyCode) => {
      dispatch(registrationActions.setDefaultCurrency(value));
    },
    [dispatch]
  );

  const onRegistrationClick = useCallback(() => {
    dispatch(registrationByEmail({ username, email, password, defaultCurrency }));
  }, [dispatch, username, email, password, defaultCurrency]);

  const onChangeReapetPassword = (val: string) => {
    setRepeatPassword(val);
    if (password !== val) {
      setRepeatPasswordError(t('registration.repeatPasswordError'));
    } else {
      setRepeatPasswordError(null);
    }
  };

  function handleClickSignIn () {
    navigate('/signin');
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
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
          <Select
            value={defaultCurrency}
            options={currencyOptions}
            onChange={onChangeDefaultCurrency}
            label={t('registration.defaultCurrency')}
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
        {isMobile && (
          <div className={cls.goToLogin}>
            {t('registration.alreadyAccount')}
            <Button theme={ThemeButton.CLEAR} onClick={handleClickSignIn}>{t('registration.signIn')}</Button>
          </div>
        )}
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(RegistrationForm);
