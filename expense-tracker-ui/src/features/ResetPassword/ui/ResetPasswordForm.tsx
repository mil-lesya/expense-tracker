import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ResetPasswordForm.module.scss';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getResetPasswordPass, getResetPasswordError, getResetPasswordIsLoading } from '../model/selectors/resetPassword';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { resetPasswordActions, resetPasswordReducer } from '../model/slice/resetPasswordSlice';
import { resetPassword } from '../model/services/resetPassword';
import { PASSWORD_MASK } from 'shared/const/mask';
import { Modal } from 'shared/ui/Modal';
import PasswordInput from 'shared/ui/Input/ui/PasswordInput';
import { useLocation, useNavigate } from 'react-router-dom';

const initialReducers: ReducersList = {
  resetPasswordForm: resetPasswordReducer
};

export interface ResetPasswordFormProps {
  className?: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const password = useSelector(getResetPasswordPass);
  const isLoading = useSelector(getResetPasswordIsLoading);
  const error = useSelector(getResetPasswordError);

  const { t } = useTranslation('unauthorized');

  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!password || !repeatPassword ||
      passwordError || repeatPasswordError) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [passwordError, repeatPasswordError, repeatPassword, password]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(resetPasswordActions.setPassword(value));
    },
    [dispatch]
  );

  const onChangeReapetPassword = (val: string) => {
    setRepeatPassword(val);
    if (password !== val) {
      setRepeatPasswordError(t('registration.repeatPasswordError'));
    } else {
      setRepeatPasswordError(null);
    }
  };

  const onResetClick = useCallback(() => {
    dispatch(resetPassword({ token, password })).then((data) => {
      setIsOpen(true);
    });
  }, [dispatch, password]);

  function onClose () {
    setIsOpen((prev) => !prev);
  }

  function goToLogin () {
    onClose();
    navigate('/signin');
  }

  return (
      <DynamicModuleLoader reducers={initialReducers}>
        <div className={classNames(cls.forgetPasswordForm, {}, [className])}>
          <h1 className={cls.title}>{t('reset.title')}</h1>
          <p className={cls.subtitle}>{t('reset.subtitle')}</p>
          <div className={cls.fields}>
            <PasswordInput
              value={password}
              onChange={onChangePassword}
              mask={PASSWORD_MASK}
              required
              errorText={t('reset.passwordError')}
              error={passwordError}
              setError={setPasswordError}
              label={t('reset.password')}
              placeholder={t('reset.placeholderPassword')}
            />
            <PasswordInput
              value={repeatPassword}
              onChange={onChangeReapetPassword}
              required
              error={repeatPasswordError}
              setError={setRepeatPasswordError}
              label={t('reset.repeatPassword')}
              placeholder={t('reset.placeholderRepeatPassword')}
            />
          </div>
          <Button
            onClick={onResetClick}
            theme={ThemeButton.PRIMARY}
            disabled={isLoading || disabledBtn}
            loading={isLoading}
            className={cls.confirm}
          >
            {t('reset.button')}
          </Button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={t('reset.modal.title')}
          subtitle=""
          className={classNames(cls.modal, {}, [className])}
        >
        <div className={cls.info}>{t('reset.modal.info')}</div>
        <div className={cls.modalButtonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            loading={isLoading}
            disabled={isLoading || disabledBtn}
            onClick={goToLogin}
            className={cls.modalButton}
          >
            {t('reset.modal.buttonOk')}
          </Button>
        </div>
      </Modal>
      </DynamicModuleLoader>
  );
};

export default ResetPasswordForm;
