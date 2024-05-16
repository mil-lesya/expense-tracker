import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChangeDepositedAmountGoalModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getChangeDepositedAmountGoalIsLoading, getChangeDepositedAmountGoalError, getChangeDepositedAmountGoalDepositedAmount } from '../model/selectors/changeDepositedAmountGoal';
import toast from 'react-hot-toast';
import { changeDepositedAmountGoal } from '../model/services/changeDepositedAmountGoal';
import { Goal } from 'entities/Goal';
import { changeDepositedAmountGoalActions, changeDepositedAmountGoalReducer } from '../model/slice/changeDepositedAmountGoalSlice';
import Input from 'shared/ui/Input/ui/Input';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';

const reducers: ReducersList = {
  changeDepositedAmountGoal: changeDepositedAmountGoalReducer
};

export interface ChangeDepositedAmountGoalModalProps {
  isTakeFrom: boolean
  isOpen: boolean
  onClose: () => void
  goal?: Goal
  className?: string
}

const ChangeDepositedAmountGoalModal: FC<ChangeDepositedAmountGoalModalProps> = (props) => {
  const { isTakeFrom, isOpen, onClose, goal, className } = props;
  const { t } = useTranslation('savings');

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getChangeDepositedAmountGoalIsLoading);
  const error = useSelector(getChangeDepositedAmountGoalError);
  const changedAmount = useSelector(getChangeDepositedAmountGoalDepositedAmount);

  const [depositedAmountError, setDepositedAmountError] = useState('');
  const [depositedAmount, setDepositedAmount] = useState<number | null>(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (depositedAmountError) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [depositedAmountError]);

  useEffect(() => {
    if (depositedAmount) {
      if (isTakeFrom) {
        const amount = goal.depositedAmount - depositedAmount;
        if (amount < 0) {
          setDepositedAmountError(t('modal.errorDepositedAmountTakeFrom'));
        } else {
          dispatch(changeDepositedAmountGoalActions.setDepositedAmount(amount));
        }
      } else {
        const amount = goal.depositedAmount + depositedAmount;
        if (amount > goal.goalAmount) {
          setDepositedAmountError(t('modal.errorDepositedAmount'));
        } else {
          dispatch(changeDepositedAmountGoalActions.setDepositedAmount(amount));
        }
      }
    }
  }, [depositedAmount]);

  const onChangeDepositedAmount = (value: string) => {
    setDepositedAmount(Number(value));
  };

  const onChangeAmount = () => {
    if (goal && depositedAmount && depositedAmount > 0) {
      dispatch(changeDepositedAmountGoal({ id: goal.id, depositedAmount: changedAmount })).finally(() => { onCloseModal(); });
    } else {
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    dispatch(changeDepositedAmountGoalActions.setDepositedAmount(null));
    setDepositedAmount(null);
    onClose();
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
    <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title={isTakeFrom ? t('modal.titleTakeFrom') : t('modal.titleContribute')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.changeDepositedAmountGoalModal, {}, [className])}
      >
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
       <div className={cls.buttonWrapper}>
        <Button
            theme={ThemeButton.PRIMARY}
            loading={isLoading}
            onClick={onChangeAmount}
            className={cls.button}
            disabled={disabledBtn}
        >
            {isTakeFrom ? t('buttons.takeFrom') : t('buttons.contribute')}
        </Button>
       </div>
    </Modal>
  </DynamicModuleLoader>
  );
};

export default ChangeDepositedAmountGoalModal;
