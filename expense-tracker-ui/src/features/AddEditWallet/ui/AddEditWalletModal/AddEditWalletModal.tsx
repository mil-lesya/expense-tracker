import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddEditWalletModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { addEditWalletActions } from 'features/AddEditWallet/model/slice/addEditWalletSlice';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getAddEditWalletBalance,
  getAddEditWalletCurrency,
  getAddEditWalletError,
  getAddEditWalletIsDefault,
  getAddEditWalletIsLoading,
  getAddEditWalletIsShowBalance,
  getAddEditWalletIsShowOnPanel,
  getAddEditWalletName
} from 'features/AddEditWallet/model/selectors/addEditWallet';
import Input from 'shared/ui/Input/ui/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { TEXT_MASK } from 'shared/const/mask';
import { CurrencyCode } from 'shared/const/common';
import Select from 'shared/ui/Select/ui/Select';
import { currencyOptions } from 'shared/lib/enumToSelect/enumToSelect';
import OptionControl from 'shared/ui/OptionControl/OptionControl';
import { addWallet } from 'features/AddEditWallet/model/services/addWallet';
import toast from 'react-hot-toast';
import { Wallet } from 'entities/Wallet';
import { editWallet } from 'features/AddEditWallet/model/services/editWallet';
import { EditWalletDto } from 'features/AddEditWallet/model/types/addEditWalletSchema';

export interface AddEditWalletModalProps {
  isEdit: boolean
  editWalletData: Wallet
  isOpen: boolean
  onClose: () => void
  className?: string
}

const AddEditWalletModal: FC<AddEditWalletModalProps> = (props) => {
  const { isEdit, editWalletData, isOpen, onClose, className } = props;

  const { t } = useTranslation('wallets');
  const dispatch = useAppDispatch();

  const name = useSelector(getAddEditWalletName);
  const balance = useSelector(getAddEditWalletBalance);
  const currency = useSelector(getAddEditWalletCurrency);
  const isDefault = useSelector(getAddEditWalletIsDefault);
  const isShowOnPanel = useSelector(getAddEditWalletIsShowOnPanel);
  const isShowBalance = useSelector(getAddEditWalletIsShowBalance);
  const isLoading = useSelector(getAddEditWalletIsLoading);
  const error = useSelector(getAddEditWalletError);

  const [nameError, setNameError] = useState('');
  const [balanceError, setBalanceError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [walletChanges, setWalletChanges] = useState({});

  useEffect(() => {
    if (isEdit && editWalletData) {
      dispatch(addEditWalletActions.setName(editWalletData.name));
      dispatch(addEditWalletActions.setBalance(editWalletData.balance));
      dispatch(addEditWalletActions.setCurrency(editWalletData.currency));
      dispatch(addEditWalletActions.setIsDefault(editWalletData.isDefault));
      dispatch(addEditWalletActions.setIsShowOnPanel(editWalletData.isShowOnPanel));
      dispatch(addEditWalletActions.setIsShowBalance(editWalletData.isShowBalance));
    }
  }, [isEdit, editWalletData]);

  useEffect(() => {
    if (isEdit && editWalletData) {
      const changes = getWalletChanges();
      setWalletChanges(changes);
    }
  }, [name, balance, currency, isDefault, isShowOnPanel, isShowBalance]);

  useEffect(() => {
    if (!name || nameError ||
        !balance || balanceError ||
        !currency) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [name, nameError, balance, balanceError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangeName = useCallback(
    (value: string) => {
      dispatch(addEditWalletActions.setName(value));
    },
    [dispatch]
  );

  const onChangeBalance = useCallback(
    (value: string) => {
      dispatch(addEditWalletActions.setBalance(Number(value)));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (value: CurrencyCode) => {
      dispatch(addEditWalletActions.setCurrency(value));
    },
    [dispatch]
  );

  const onChangeIsDefault = useCallback(
    (value: boolean) => {
      dispatch(addEditWalletActions.setIsDefault(value));
    },
    [dispatch]
  );

  const onChangeIsShowOnPanel = useCallback(
    (value: boolean) => {
      dispatch(addEditWalletActions.setIsShowOnPanel(value));
    },
    [dispatch]
  );

  const onChangeIsShowBalance = useCallback(
    (value: boolean) => {
      dispatch(addEditWalletActions.setIsShowBalance(value));
    },
    [dispatch]
  );

  const onCloseModal = () => {
    onClose();
    dispatch(addEditWalletActions.resetState());
    setNameError('');
    setBalanceError('');
  };

  const getWalletChanges = () => {
    const differences: Omit<EditWalletDto, 'id'> = {};

    // Сравниваем поля и добавляем изменения в новый объект
    if (editWalletData.name !== name) differences.name = name;
    if (editWalletData.balance !== balance) differences.balance = balance;
    if (editWalletData.currency !== currency) differences.currency = currency;
    if (editWalletData.isDefault !== isDefault) differences.isDefault = isDefault;
    if (editWalletData.isShowOnPanel !== isShowOnPanel) differences.isShowOnPanel = isShowOnPanel;
    if (editWalletData.isShowBalance !== isShowBalance) differences.isShowBalance = isShowBalance;

    return differences;
  };

  const onAddEditWallet = useCallback(
    () => {
      if (isEdit) {
        if (Object.keys(walletChanges).length === 0) {
          onCloseModal();
          return;
        }

        dispatch(editWallet({ id: editWalletData.id, ...walletChanges })).then(() => {
          onCloseModal();
        });
        return;
      }

      dispatch(addWallet({ name, balance, currency, isDefault, isShowBalance, isShowOnPanel })).then(() => {
        onCloseModal();
      });
    },
    [dispatch, isEdit, editWalletData, walletChanges, name, balance, currency, isDefault, isShowBalance, isShowOnPanel]
  );

  return (
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title={t(isEdit ? 'modal.titleEdit' : 'modal.titleAdd')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.addEditWalletModal, {}, [className])}
      >
        <div className={cls.formWrapper}>
            <Input
                value={name}
                onChange={onChangeName}
                mask={TEXT_MASK}
                required
                error={nameError}
                setError={setNameError}
                label={t('modal.labelName')}
                placeholder={t('modal.placeholderName')}
            />
            <Input
                value={balance}
                onChange={onChangeBalance}
                required
                maskOptions={{
                  mask: Number,
                  scale: 2,
                  thousandsSeparator: ' '
                }}
                error={balanceError}
                setError={setBalanceError}
                errorText={t('modal.errorBalance')}
                label={t('modal.labelStartingBalance')}
                placeholder={t('modal.placeholderStartingBalance')}
            />
            <Select
                label={t('modal.labelCurrency')}
                value={currency}
                options={currencyOptions}
                onChange={onChangeCurrency}
                readonly={isEdit}
            />
            <OptionControl
                title={t('modal.labelIsDefault')}
                checked={isDefault}
                onUpdateChecked={onChangeIsDefault}
            />
            <div className={cls.controlsWrapper}>
            <OptionControl
                title={t('modal.labelIsShowOnPanel')}
                inputType='checkbox'
                checked={isShowOnPanel}
                textPositionRight
                onUpdateChecked={onChangeIsShowOnPanel}
            />
            <OptionControl
                title={t('modal.labelIsShowBalance')}
                inputType='checkbox'
                checked={isShowBalance}
                textPositionRight
                onUpdateChecked={onChangeIsShowBalance}
            />
            </div>
        </div>
        <div className={cls.buttonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            disabled={disabledBtn}
            loading={isLoading}
            className={cls.button}
            onClick={onAddEditWallet}
          >
              {t(isEdit ? 'modal.buttonEdit' : 'modal.buttonCreate')}
          </Button>
        </div>
      </Modal>
  );
};

export default AddEditWalletModal;
