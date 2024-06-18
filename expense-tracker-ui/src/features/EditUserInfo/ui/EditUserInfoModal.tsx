import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EditUserInfoModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { editUserInfo } from '../model/services/editUserInfo';
import { editUserInfoActions, editUserInfoReducer } from '../model/slice/editUserInfoSlice';
import { EditUserInfoDto } from '../model/types/editUserInfoSchema';
import Select from 'shared/ui/Select/ui/Select';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import Input from 'shared/ui/Input/ui/Input';
import { currencyOptions } from 'shared/lib/enumToSelect/enumToSelect';
import { User } from 'entities/User';
import { getEditUserInfoDefaultCurrency, getEditUserInfoError, getEditUserInfoIsLoading, getEditUserInfoUsername } from '../model/selectors/editUserInfo';
import { CurrencyCode } from 'shared/const/common';
import { TEXT_MASK } from 'shared/const/mask';

const initialReducers: ReducersList = {
  editUserInfo: editUserInfoReducer
};

export interface EditUserInfoModalProps {
  isOpen: boolean
  onClose: () => void
  user?: User
  className?: string
}

const EditUserInfoModal: FC<EditUserInfoModalProps> = (props) => {
  const { isOpen, onClose, user, className } = props;
  const { t } = useTranslation('settings');

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getEditUserInfoIsLoading);
  const error = useSelector(getEditUserInfoError);
  const username = useSelector(getEditUserInfoUsername);
  const defaultCurrency = useSelector(getEditUserInfoDefaultCurrency);

  const [disabledBtn, setDisabledBtn] = useState(false);
  const [userInfoChanges, setUserInfoChanges] = useState({});
  const [usernameError, setUsernameError] = useState('');

  useEffect(() => {
    if (!username ||
        usernameError ||
        !defaultCurrency) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [username, usernameError, defaultCurrency]);

  useEffect(() => {
    if (user) {
      const changes = getUserInfoChanges();
      setUserInfoChanges(changes);
    }
  }, [username, defaultCurrency]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      dispatch(editUserInfoActions.setUsername(user.username));
      dispatch(editUserInfoActions.setDefaultCurrency(user.defaultCurrency));
    }
  }, [user]);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(editUserInfoActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (value: CurrencyCode) => {
      dispatch(editUserInfoActions.setDefaultCurrency(value));
    },
    [dispatch]
  );

  const getUserInfoChanges = () => {
    const differences: Omit<EditUserInfoDto, 'id'> = {};

    if (user.username !== username) differences.username = username;
    if (user.defaultCurrency !== defaultCurrency) differences.defaultCurrency = defaultCurrency;

    return differences;
  };

  const onEdit = () => {
    if (Object.keys(userInfoChanges).length === 0) {
      onClose();
      return;
    }

    dispatch(editUserInfo({ id: user.id, ...userInfoChanges })).finally(() => { setUserInfoChanges({}); onClose(); });
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={t('modal.titleEdit')}
          subtitle={t('modal.subtitle')}
          className={classNames(cls.editTransactionModal, {}, [className])}
        >
        <div className={cls.formWrapper}>
          <Input
              value={username}
              onChange={onChangeUsername}
              mask={TEXT_MASK}
              required
              errorText={t('modal.usernameError')}
              error={usernameError}
              setError={setUsernameError}
              label={t('modal.labelUsername')}
              placeholder={t('modal.placeholderUsername')}
            />
          <Select
            value={defaultCurrency}
            options={currencyOptions}
            onChange={onChangeCurrency}
            label={t('modal.labelDefaultCurrency')}
          />
        </div>
        <div className={cls.buttonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            loading={isLoading}
            disabled={isLoading || disabledBtn}
            onClick={onEdit}
            className={cls.button}
          >
            {t('modal.buttonEdit')}
          </Button>
        </div>
      </Modal>
    </DynamicModuleLoader>
  );
};

export default EditUserInfoModal;
