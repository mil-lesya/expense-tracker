import { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SettingsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { useTranslation } from 'react-i18next';
import { PageInfoBlock } from 'widgets/PageInfoBlock';
import { useSelector } from 'react-redux';
import { getUserState } from 'entities/User';
import { Button, ThemeButton } from 'shared/ui/Button';
import { PageLoader } from 'shared/ui/PageLoader';
import EditUserInfoModal from 'features/EditUserInfo/ui/EditUserInfoModal';
import { Modal } from 'shared/ui/Modal';

interface SettingsPageProps {
  className?: string
}

const SettingsPage: FC<SettingsPageProps> = (props) => {
  const { className } = props;

  const { t, i18n } = useTranslation('settings');

  const { authData, isLoading } = useSelector(getUserState);

  const [isEditUserModal, setIsEditUserModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onToggleEditUserModal = useCallback(() => {
    setIsEditUserModal((prev) => !prev);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  function onClose () {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
     <PageHeader>{t('title')}</PageHeader>
     {isLoading
       ? (
        <PageLoader></PageLoader>
         )
       : (
        <div className={classNames(cls.savingsPage, {}, [className])}>
        <PageInfoBlock
            buttonText={t('buttons.edit')}
            onClick={onToggleEditUserModal}>
          {t('info')}
        </PageInfoBlock>

        {authData && (
          <>
        <div className={cls.dataWrapper}>
          <div className={cls.blockWrapper}>
            <h3 className={cls.blockTitle}>{t('userData')}</h3>

            <div className={cls.field}>
              <p className={cls.fieldName}>{t('fields.name')}</p>
              <p className={cls.fieldValue}>{authData.username}</p>
            </div>

            <div className={cls.field}>
              <p className={cls.fieldName}>{t('fields.defaultCurrency')}</p>
              <p className={cls.fieldValue}>{authData.defaultCurrency}</p>
            </div>

          </div>
          <div className={cls.blockWrapper}>
            <h3 className={cls.blockTitle}>Email</h3>

            <div className={cls.field}>
              <p className={cls.fieldNameEmail}>{authData.email}</p>
              <p className={classNames(cls.fieldValue, { [cls.red]: !authData.isConfirmed, [cls.green]: authData.isConfirmed }, [])}>{t(authData.isConfirmed ? 'confirmed' : 'notConfirmed')}</p>
              {!authData.isConfirmed && (
                <Button
                  theme={ThemeButton.OUTLINE}
                  onClick={onClose}
                >
                  {t('buttons.confirm')}
                </Button>
              )}
            </div>
          </div>
          <div className={cls.blockWrapper}>
            <h3 className={cls.blockTitle}>{t('localization')}</h3>

            <div className={cls.field}>
              <p className={cls.fieldName}>{t('lang')}</p>
              <Button
                theme={ThemeButton.CLEAR}
                onClick={toggleLang}
              >
              {i18n.language === 'ru' ? 'Нажмите чтобы изменить: RU' : 'Click to change: EN'}
              </Button>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
         )}

      <EditUserInfoModal
        isOpen={isEditUserModal}
        onClose={onToggleEditUserModal}
        user={authData}
      />

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={t('modal.confirm.title')}
          subtitle=""
          className={classNames(cls.modal, {}, [className])}
        >
        <div className={cls.info}>{t('modal.confirm.info')}</div>
        <div className={cls.modalButtonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            onClick={onClose}
            className={cls.modalButton}
          >
            {t('modal.confirm.buttonOk')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SettingsPage;
