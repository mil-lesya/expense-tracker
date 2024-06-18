import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ConfirmPage.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { confirmReducer } from '../model/slice/confirmSlice';
import { Modal } from 'shared/ui/Modal';
import { Button, ThemeButton } from 'shared/ui/Button';
import { confirm } from '../model/services/confirm';
import { initAuthData } from 'entities/User/model/services/initAuthData';
import { PageLoader } from 'shared/ui/PageLoader';

const initialReducers: ReducersList = {
  confirm: confirmReducer
};

interface ConfirmPageProps {
  className?: string
}

const ConfirmPage: FC<ConfirmPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('unauthorized');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(confirm(token)).then((data) => {
        dispatch(initAuthData());
        setIsOpen(true);
      });
    }
  }, [token]);

  function onClose () {
    setIsOpen((prev) => !prev);
    navigate('/dashboard');
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
    <div className={classNames(cls.forgetPasswordPage, {}, [className])}>
      <PageLoader />
    </div>
    <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={t('confirm.modal.title')}
          subtitle=""
          className={classNames(cls.modal, {}, [className])}
        >
        <div className={cls.info}>{t('confirm.modal.info')}</div>
        <div className={cls.modalButtonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            onClick={onClose}
            className={cls.modalButton}
          >
            {t('confirm.modal.buttonOk')}
          </Button>
        </div>
      </Modal>
    </DynamicModuleLoader>
  );
};

export default ConfirmPage;
