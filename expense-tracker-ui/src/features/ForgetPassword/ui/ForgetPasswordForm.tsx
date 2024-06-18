import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ForgetPasswordForm.module.scss';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getForgetPasswordEmail, getForgetPasswordError, getForgetPasswordIsLoading } from '../model/selectors/forgetPassword';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { forgetPasswordActions, forgetPasswordReducer } from '../model/slice/forgetPasswordSlice';
import { forgetPassword } from '../model/services/forgetPassword';
import { EMAIL_MASK } from 'shared/const/mask';
import Input from 'shared/ui/Input/ui/Input';
import { Modal } from 'shared/ui/Modal';

const initialReducers: ReducersList = {
  forgetPasswordForm: forgetPasswordReducer
};

export interface ForgetPasswordFormProps {
  className?: string
}

const ForgetPasswordForm: FC<ForgetPasswordFormProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const email = useSelector(getForgetPasswordEmail);
  const isLoading = useSelector(getForgetPasswordIsLoading);
  const error = useSelector(getForgetPasswordError);

  const { t } = useTranslation('unauthorized');

  const [emailError, setEmailError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!email || emailError) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [email, emailError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(forgetPasswordActions.setEmail(value));
    },
    [dispatch]
  );

  const onForgetClick = useCallback(() => {
    dispatch(forgetPassword(email)).then((data) => {
      setIsOpen(true);
    });
  }, [dispatch, email]);

  function onClose () {
    setIsOpen((prev) => !prev);
  }

  return (
      <DynamicModuleLoader reducers={initialReducers}>
        <div className={classNames(cls.forgetPasswordForm, {}, [className])}>
          <h1 className={cls.title}>{t('forget.title')}</h1>
          <p className={cls.subtitle}>{t('forget.subtitle')}</p>
          <div className={cls.fields}>
            <Input
              value={email}
              onChange={onChangeEmail}
              mask={EMAIL_MASK}
              required
              errorText={t('forget.emailError')}
              error={emailError}
              setError={setEmailError}
              label='Email'
              placeholder='example@mail.com'
            />
          </div>
          <Button
            onClick={onForgetClick}
            theme={ThemeButton.PRIMARY}
            disabled={isLoading || disabledBtn}
            loading={isLoading}
            className={cls.confirm}
          >
            {t('forget.button')}
          </Button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={t('forget.modal.title')}
          subtitle=""
          className={classNames(cls.modal, {}, [className])}
        >
        <div className={cls.info}>{t('forget.modal.info')}</div>
        <div className={cls.modalButtonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            loading={isLoading}
            disabled={isLoading || disabledBtn}
            onClick={onClose}
            className={cls.modalButton}
          >
            {t('forget.modal.buttonOk')}
          </Button>
        </div>
      </Modal>
      </DynamicModuleLoader>
  );
};

export default ForgetPasswordForm;
