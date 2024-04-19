import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EditTransactionModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getEditTransactionAmount,
  getEditTransactionCategoryId,
  getEditTransactionCurrency,
  getEditTransactionDate,
  getEditTransactionDescription,
  getEditTransactionError,
  getEditTransactionIsLoading,
  getEditTransactionType,
  getEditTransactionWalletId
} from '../model/selectors/editTransaction';
import toast from 'react-hot-toast';
import { editTransaction } from '../model/services/editTransaction';
import { Transaction } from 'entities/Transaction';
import { editTransactionActions, editTransactionReducer } from '../model/slice/editTransactionSlice';
import { EditTransactionDto } from '../model/types/editTransactionSchema';
import Select from 'shared/ui/Select/ui/Select';
import { getUserWallets } from 'entities/Wallet';
import { transformToSelectOptions } from 'shared/lib/transformToSelect/transformToSelect';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { getUserCategories } from 'entities/Category';
import Input from 'shared/ui/Input/ui/Input';
import { currencyOptions } from 'shared/lib/enumToSelect/enumToSelect';
import DatePicker from 'shared/ui/DatePicker/DatePicker';

const initialReducers: ReducersList = {
  editTransaction: editTransactionReducer
};

export interface EditTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction
  currentPage?: number
  limit?: number
  className?: string
}

const EditTransactionModal: FC<EditTransactionModalProps> = (props) => {
  const { isOpen, onClose, transaction, currentPage, limit, className } = props;
  const { t } = useTranslation('transactions');

  const dispatch = useAppDispatch();

  const today = new Date();

  const wallets = useSelector(getUserWallets.selectAll);
  const categories = useSelector(getUserCategories.selectAll);

  const isLoading = useSelector(getEditTransactionIsLoading);
  const error = useSelector(getEditTransactionError);
  const walletId = useSelector(getEditTransactionWalletId);
  const categoryId = useSelector(getEditTransactionCategoryId);
  const amount = useSelector(getEditTransactionAmount);
  const currency = useSelector(getEditTransactionCurrency);
  const description = useSelector(getEditTransactionDescription);
  const date = useSelector(getEditTransactionDate);
  const type = useSelector(getEditTransactionType);

  const [amountError, setAmountError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [transactionChanges, setTransactionChanges] = useState({});
  const [walletOptions, setWalletOptions] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);

  useEffect(() => {
    if (wallets.length > 0) {
      setWalletOptions(transformToSelectOptions(wallets, 'id', 'name'));
    }
  }, [wallets]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryOptions(transformToSelectOptions(categories, 'id', 'name', 'icon'));
    }
  }, [categories]);

  useEffect(() => {
    if (transaction) {
      const changes = getTransactionChanges();
      setTransactionChanges(changes);
    }
  }, [amount, categoryId, date, description, walletId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (transaction) {
      dispatch(editTransactionActions.setWalletId(transaction.walletId));
      dispatch(editTransactionActions.setCategoryId(transaction.category.id));
      dispatch(editTransactionActions.setAmount(transaction.amount));
      dispatch(editTransactionActions.setCurrency(transaction.currency));
      dispatch(editTransactionActions.setDescription(transaction.description));
      dispatch(editTransactionActions.setDate(transaction.date));
      dispatch(editTransactionActions.setType(transaction.type));
    }
  }, [transaction]);

  const onChangeCategoryId = useCallback(
    (value: string) => {
      dispatch(editTransactionActions.setCategoryId(value));
    },
    [dispatch]
  );

  const onChangeWalletId = useCallback(
    (value: string) => {
      dispatch(editTransactionActions.setWalletId(value));
    },
    [dispatch]
  );

  const onChangeAmount = useCallback(
    (value: string) => {
      dispatch(editTransactionActions.setAmount(Number(value)));
    },
    [dispatch]
  );

  const onChangeDescription = useCallback(
    (value: string) => {
      dispatch(editTransactionActions.setDescription(value));
    },
    [dispatch]
  );

  const getTransactionChanges = () => {
    const differences: Omit<EditTransactionDto, 'id' | 'type' | 'currentPage' | 'limit' | 'currency'> = {};

    if (transaction.amount !== amount) differences.amount = amount;
    if (transaction.category.id !== categoryId) differences.categoryId = categoryId;
    if (transaction.date !== date) differences.date = date;
    if (transaction.description !== description) differences.description = description;
    if (transaction.walletId !== walletId) differences.walletId = walletId;

    return differences;
  };

  const onEdit = () => {
    if (Object.keys(transactionChanges).length === 0) {
      onClose();
      return;
    }

    dispatch(editTransaction({ id: transaction.id, currentPage, limit, ...transactionChanges })).finally(() => { onClose(); });
  };

  const handleDateChange = (range: Date) => {
    const date = new Date(range);
    const isoString = date.toISOString();

    dispatch(editTransactionActions.setDate(isoString));
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
            <Select
              label={t(type === 'expense' ? 'modal.labelExpenseWallet' : 'modal.labelIncomeWallet')}
              value={walletId}
              options={walletOptions}
              onChange={onChangeWalletId}
            />
            <Select
              label={t('modal.labelCategory')}
              value={categoryId}
              options={categoryOptions}
              onChange={onChangeCategoryId}
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
            <Select
              label={t('modal.labelCurrency')}
              value={currency}
              options={currencyOptions}
              onChange={() => {}}
              readonly
            />
            <Input
              value={description}
              onChange={onChangeDescription}
              label={t('modal.labelDescription')}
              placeholder={t('modal.placeholderDescription')}
            />
            <DatePicker
              initialDate={date}
              onDateChange={handleDateChange}
              label={t('modal.labelDate')}
              maxDate={today}
            />
        </div>
        <div className={cls.buttonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            loading={isLoading}
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

export default EditTransactionModal;
