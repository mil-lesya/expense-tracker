import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddEditGoalModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Input from 'shared/ui/Input/ui/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { TEXT_MASK } from 'shared/const/mask';
import { CurrencyCode } from 'shared/const/common';
import Select from 'shared/ui/Select/ui/Select';
import { currencyOptions } from 'shared/lib/enumToSelect/enumToSelect';
import OptionControl from 'shared/ui/OptionControl/OptionControl';
import toast from 'react-hot-toast';
import { Goal } from 'entities/Goal/model/types/goal';
import {
  getAddEditGoalAmount,
  getAddEditGoalCurrency,
  getAddEditGoalDepositedAmount,
  getAddEditGoalError,
  getAddEditGoalImage,
  getAddEditGoalIsCompleted,
  getAddEditGoalIsLoading,
  getAddEditGoalName,
  getAddEditGoalTargetDate
} from 'features/AddEditGoal/model/selectors/addEditGoal';
import { addEditGoalActions } from 'features/AddEditGoal/model/slice/addEditGoalSlice';
import { EditGoalDto } from 'features/AddEditGoal/model/types/addEditGoalSchema';
import { addGoal } from 'features/AddEditGoal/model/services/addGoal';
import DatePicker from 'shared/ui/DatePicker/DatePicker';
import { editGoal } from 'features/AddEditGoal/model/services/editGoal';
import ImageUploader from 'shared/ui/ImageUploader/ImageUploader';

export interface AddEditGoalModalProps {
  isEdit: boolean
  editGoalData: Goal
  isOpen: boolean
  onClose: () => void
  className?: string
}

const AddEditGoalModal: FC<AddEditGoalModalProps> = (props) => {
  const { isEdit, editGoalData, isOpen, onClose, className } = props;

  const { t } = useTranslation('savings');
  const dispatch = useAppDispatch();

  const name = useSelector(getAddEditGoalName);
  const goalAmount = useSelector(getAddEditGoalAmount);
  const currency = useSelector(getAddEditGoalCurrency);
  const depositedAmount = useSelector(getAddEditGoalDepositedAmount);
  const targetDate = useSelector(getAddEditGoalTargetDate);
  const isCompleted = useSelector(getAddEditGoalIsCompleted);
  const isLoading = useSelector(getAddEditGoalIsLoading);
  const error = useSelector(getAddEditGoalError);

  const [image, setImage] = useState<File | null>();
  const [nameError, setNameError] = useState('');
  const [goalAmountError, setGoalAmountError] = useState('');
  const [depositedAmountError, setDepositedAmountError] = useState('');
  const [isTargetDate, setIsTargetDate] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [goalChanges, setGoalChanges] = useState({});

  useEffect(() => {
    if (isEdit && editGoalData) {
      dispatch(addEditGoalActions.setName(editGoalData.name));
      dispatch(addEditGoalActions.setGoalAmount(editGoalData.goalAmount));
      dispatch(addEditGoalActions.setCurrency(editGoalData.currency));
      dispatch(addEditGoalActions.setDepositedAmount(editGoalData.depositedAmount));
      dispatch(addEditGoalActions.setTargetDate(editGoalData.targetDate));

      if (targetDate) {
        setIsTargetDate(true);
      }
    }
  }, [isEdit, editGoalData]);

  useEffect(() => {
    if (isEdit && editGoalData) {
      const changes = getWalletChanges();
      setGoalChanges(changes);
    }
  }, [name, goalAmount, currency, depositedAmount, targetDate, image, isTargetDate]);

  useEffect(() => {
    if (!name || nameError ||
        !goalAmount || goalAmountError ||
        depositedAmountError ||
        !currency) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [name, nameError, goalAmount, goalAmountError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (depositedAmount > goalAmount) {
      setDepositedAmountError(t('modal.errorDepositedAmount'));
    }
  }, [depositedAmount, goalAmount]);

  const onChangeName = useCallback(
    (value: string) => {
      dispatch(addEditGoalActions.setName(value));
    },
    [dispatch]
  );

  const onChangeGoalAmount = useCallback(
    (value: string) => {
      dispatch(addEditGoalActions.setGoalAmount(Number(value)));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (value: CurrencyCode) => {
      dispatch(addEditGoalActions.setCurrency(value));
    },
    [dispatch]
  );

  const onChangeDepositedAmount = useCallback(
    (value: string) => {
      dispatch(addEditGoalActions.setDepositedAmount(Number(value)));
    },
    [dispatch]
  );

  const handleDateChange = (range: Date) => {
    const date = new Date(range);
    const isoString = date.toISOString();

    dispatch(addEditGoalActions.setTargetDate(isoString));
  };

  const onCloseModal = () => {
    onClose();
    dispatch(addEditGoalActions.resetState());
    setNameError('');
    setGoalAmountError('');
    setDepositedAmountError('');
    setImage(null);
    setIsTargetDate(false);
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const getWalletChanges = () => {
    const differences: Omit<EditGoalDto, 'id'> = {};

    // Сравниваем поля и добавляем изменения в новый объект
    if (editGoalData.name !== name) differences.name = name;
    if (editGoalData.goalAmount !== goalAmount) differences.goalAmount = goalAmount;
    if (editGoalData.currency !== currency) differences.currency = currency;
    if (editGoalData.depositedAmount !== depositedAmount) differences.depositedAmount = depositedAmount;
    if (editGoalData.targetDate !== targetDate ||
      (editGoalData.targetDate && !isTargetDate) ||
      (!editGoalData.targetDate && isTargetDate)) {
      differences.targetDate = isTargetDate ? targetDate : null;
    }
    if (image) differences.image = image;

    console.log(differences);
    return differences;
  };

  const onAddEditWallet = useCallback(
    () => {
      if (isEdit) {
        if (Object.keys(goalChanges).length === 0) {
          onCloseModal();
          return;
        }

        dispatch(editGoal({ id: editGoalData.id, ...goalChanges, targetDate: isTargetDate ? targetDate : 'null' })).then(() => {
          onCloseModal();
        });
        return;
      }

      dispatch(addGoal({ name, goalAmount, currency, depositedAmount, image, targetDate: isTargetDate ? targetDate : null, isCompleted })).then(() => {
        onCloseModal();
      });
    },
    [dispatch, isEdit, editGoalData, goalChanges, name, goalAmount, currency, depositedAmount, image, targetDate, isTargetDate]
  );

  return (
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title={t(isEdit ? 'modal.titleEdit' : 'modal.titleAdd')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.addEditGoalModal, {}, [className])}
      >
        <div className={cls.formWrapper}>
          <div className={cls.leftBlock}>
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
                value={goalAmount}
                onChange={onChangeGoalAmount}
                required
                maskOptions={{
                  mask: Number,
                  scale: 2,
                  thousandsSeparator: ' '
                }}
                error={goalAmountError}
                setError={setGoalAmountError}
                errorText={t('modal.errorBalance')}
                label={t('modal.labelAmount')}
                placeholder={t('modal.placeholderAmount')}
            />
            <Select
                label={t('modal.labelCurrency')}
                value={currency}
                options={currencyOptions}
                onChange={onChangeCurrency}
            />
              <Input
                value={depositedAmount}
                onChange={onChangeDepositedAmount}
                maskOptions={{
                  mask: Number,
                  scale: 2,
                  thousandsSeparator: ' '
                }}
                error={depositedAmountError}
                setError={setDepositedAmountError}
                errorText={t('modal.errorBalance')}
                label={t('modal.labelDepositedAmount')}
                placeholder={t('modal.placeholderDepositedAmount')}
            />
            </div>
            <div className={cls.rightBlock}>
            <ImageUploader
              image={image}
              onImageUpload={handleImageUpload}
              initialImageUrl={isEdit ? editGoalData.image : undefined}
            />
            <div className={cls.targetDateWrapper}>
            <OptionControl
                title={t('modal.labelToggle')}
                checked={isTargetDate}
                onUpdateChecked={(val: boolean) => { setIsTargetDate(val); }}
            />
            <DatePicker
              initialDate={targetDate || new Date().toISOString()}
              onDateChange={handleDateChange}
              minDate={new Date()}
              readonly={!isTargetDate}
            />
            </div>
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

export default AddEditGoalModal;
