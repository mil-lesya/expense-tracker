import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddEditBudgetModal.module.scss';
import { useTranslation } from 'react-i18next';
import { BudgetPeriod, Budget } from 'entities/Budget';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getAddEditBudgetAmount, getAddEditBudgetError, getAddEditBudgetIsLoading, getAddEditBudgetName, getAddEditBudgetPeriod } from '../model/selectors/addEditBudget';
import toast from 'react-hot-toast';
import { addEditBudgetActions, addEditBudgetReducer } from '../model/slice/addEditBudgetSlice';
import { getUserState } from 'entities/User';
import { addBudget } from '../model/services/addBudget';
import { Modal } from 'shared/ui/Modal';
import Input from 'shared/ui/Input/ui/Input';
import { TEXT_MASK } from 'shared/const/mask';
import { Button, ThemeButton } from 'shared/ui/Button';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { EditBudgetDto } from '../model/types/addEditBudgetSchema';
import { editBudget } from '../model/services/editBudget';

const initialReducers: ReducersList = {
  addEditBudget: addEditBudgetReducer
};

export interface AddEditBudgetModalProps {
  defaultPeriod: BudgetPeriod | 'all'
  isOpen: boolean
  onClose: () => void
  isEdit: boolean
  budgetData: Budget
  className?: string
}

const AddEditBudgetModal: FC<AddEditBudgetModalProps> = (props) => {
  const { className, defaultPeriod, isOpen, onClose, isEdit, budgetData } = props;

  const { t } = useTranslation('budgets');

  const dispatch = useAppDispatch();

  const { authData } = useSelector(getUserState);

  const name = useSelector(getAddEditBudgetName);
  const amount = useSelector(getAddEditBudgetAmount);
  const period = useSelector(getAddEditBudgetPeriod);
  const isLoading = useSelector(getAddEditBudgetIsLoading);
  const error = useSelector(getAddEditBudgetError);

  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [budgetChanges, setBudgetChanges] = useState({});

  useEffect(() => {
    if (isEdit && budgetData) {
      dispatch(addEditBudgetActions.setName(budgetData.name));
      dispatch(addEditBudgetActions.setAmount(budgetData.amount));
      dispatch(addEditBudgetActions.setPeriod(budgetData.period));
    }
  }, [isEdit, budgetData]);

  useEffect(() => {
    if (isEdit && budgetData) {
      const changes = getBudgetChanges();
      setBudgetChanges(changes);
    }
  }, [name, amount, period]);

  useEffect(() => {
    if (!name || nameError ||
        !amount || amountError || !period) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [name, nameError, amount, amountError, period]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangeName = useCallback(
    (value: string) => {
      dispatch(addEditBudgetActions.setName(value));
    },
    [dispatch]
  );

  const onChangeAmount = useCallback(
    (value: string) => {
      dispatch(addEditBudgetActions.setAmount(Number(value)));
    },
    [dispatch]
  );

  const onChangePeriod = useCallback(
    (value: BudgetPeriod) => {
      dispatch(addEditBudgetActions.setPeriod(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (defaultPeriod !== 'all') {
      onChangePeriod(defaultPeriod);
    }
  }, [defaultPeriod]);

  const onCloseModal = () => {
    onClose();
    dispatch(addEditBudgetActions.resetState());
    setNameError('');
    setAmountError('');
  };

  const onAddEditBudget = useCallback(
    () => {
      if (isEdit) {
        if (Object.keys(budgetChanges).length === 0) {
          onCloseModal();
          return;
        }

        dispatch(editBudget({ id: budgetData.id, ...budgetChanges, currency: authData.defaultCurrency })).then(() => {
          onCloseModal();
        });
        return;
      }

      dispatch(addBudget({ name, amount, period, currency: authData.defaultCurrency })).then(() => {
        onCloseModal();
      });
    },
    [dispatch, isEdit, name, amount, period, budgetChanges]
  );

  const getBudgetChanges = () => {
    const differences: Omit<EditBudgetDto, 'id' | 'currency' | 'period'> = {};

    // Сравниваем поля и добавляем изменения в новый объект
    if (budgetData.name !== name) differences.name = name;
    if (budgetData.amount !== amount) differences.amount = amount;

    return differences;
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
    <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title={isEdit ? t('modal.titleEdit') : t('modal.titleAdd')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.addBudgetModal, {}, [className])}
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
                value={amount}
                onChange={onChangeAmount}
                required
                maskOptions={{
                  mask: Number,
                  scale: 2,
                  thousandsSeparator: ' '
                }}
                error={amountError}
                setError={setAmountError}
                errorText={t('modal.errorAmount')}
                label={t('modal.labelAmount')}
                placeholder={t('modal.placeholderAmount')}
            />
            {(defaultPeriod === 'all' && !isEdit)
              ? (
              <div className={cls.periodWrapper}>
                <p className={cls.labelPeriod}>{t('modal.labelPeriod')}</p>
              <div className={cls.controlsWrapper}>
               <Button
                  className={cls.buttonPeriod}
                  theme={ThemeButton.GREY}
                  active={period === 'weekly'}
                  onClick={() => { onChangePeriod('weekly'); }}>
                    {t('period.weekly')}
               </Button>
               <Button
                  className={cls.buttonPeriod}
                  theme={ThemeButton.GREY}
                  active={period === 'monthly'}
                  onClick={() => { onChangePeriod('monthly'); }}>
                    {t('period.monthly')}
               </Button>
               <Button
                  className={cls.buttonPeriod}
                  theme={ThemeButton.GREY}
                  active={period === 'yearly'}
                  onClick={() => { onChangePeriod('yearly'); }}>
                    {t('period.yearly')}
               </Button>
             </div>
             </div>
                )
              : (
              <div className={cls.periodWrapper}>
                <p className={cls.labelPeriod}>{t('modal.labelPeriod')}</p>
              <div className={cls.controlsWrapper}>
               <Button
                  className={cls.buttonPeriod}
                  theme={ThemeButton.GREY}
                  active={true}
                  onClick={() => { }}>
                    {t(`period.${defaultPeriod}`)}
               </Button>
               </div>
             </div>
                )
            }
        </div>
        <div className={cls.buttonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            disabled={disabledBtn}
            loading={isLoading}
            className={cls.button}
            onClick={onAddEditBudget}
          >
              {isEdit ? t('modal.buttonEdit') : t('modal.buttonCreate')}
          </Button>
        </div>
      </Modal>
      </DynamicModuleLoader>
  );
};

export default AddEditBudgetModal;
