import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddTransactionForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getAddTransactionAmount,
  getAddTransactionCategoryId,
  getAddTransactionCurrency,
  getAddTransactionDate,
  getAddTransactionDescription,
  getAddTransactionError,
  getAddTransactionIsLoading,
  getAddTransactionType,
  getAddTransactionWalletId
} from '../model/selectors/addTransaction';
import toast from 'react-hot-toast';
import { addTransaction } from '../model/services/addTransaction';
import { TransactionType } from 'entities/Transaction';
import { addTransactionActions, addTransactionReducer } from '../model/slice/addTransactionSlice';
import Select, { SelectOption } from 'shared/ui/Select/ui/Select';
import { getUserWallets } from 'entities/Wallet';
import { transformToSelectOptions } from 'shared/lib/transformToSelect/transformToSelect';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { getUserCategories } from 'entities/Category';
import Input from 'shared/ui/Input/ui/Input';
import { currencyOptions } from 'shared/lib/enumToSelect/enumToSelect';
import DatePicker from 'shared/ui/DatePicker/DatePicker';
import { CurrencyCode, categoryIconOptions } from 'shared/const/common';

const initialReducers: ReducersList = {
  addTransaction: addTransactionReducer
};

export interface AddTransactionFormProps {
  className?: string
}

const AddTransactionForm: FC<AddTransactionFormProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation(['transactions', 'category']);

  const dispatch = useAppDispatch();

  const today = new Date();

  const wallets = useSelector(getUserWallets.selectAll);
  const categories = useSelector(getUserCategories.selectAll);

  const isLoading = useSelector(getAddTransactionIsLoading);
  const error = useSelector(getAddTransactionError);
  const walletId = useSelector(getAddTransactionWalletId);
  const categoryId = useSelector(getAddTransactionCategoryId);
  const amount = useSelector(getAddTransactionAmount);
  const currency = useSelector(getAddTransactionCurrency);
  const description = useSelector(getAddTransactionDescription);
  const date = useSelector(getAddTransactionDate);
  const type = useSelector(getAddTransactionType);

  const [amountError, setAmountError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [walletOptions, setWalletOptions] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>();
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');

  useEffect(() => {
    if (amount && walletId) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [amount, walletId]);

  useEffect(() => {
    if (wallets.length > 0) {
      setWalletOptions(transformToSelectOptions(wallets, 'id', 'name'));
    }
  }, [wallets]);

  useEffect(() => {
    let options = [{
      value: 'new', content: t('category:newCategory'), icon: 'plus'
    }];
    if (categories.length > 0) {
      const categoryByType = categories.filter((item) => item.type === type).map(item => ({
        value: item.id,
        content: t(`category:${item.name}`),
        icon: item.icon ? item.icon : undefined
      }));
      options = [...options, ...categoryByType];
    }
    setCategoryOptions(options);
  }, [categories, type]);

  useEffect(() => {
    if (wallets.length > 0) {
      setWalletOptions(transformToSelectOptions(wallets, 'id', 'name'));
    }
  }, [wallets]);

  useEffect(() => {
    if (wallets.length > 0) {
      dispatch(addTransactionActions.setWalletId(wallets[0].id));
    }
    if (categories.length > 0 && categoryOptions && categoryOptions.length > 1) {
      dispatch(addTransactionActions.setCategoryId(categoryOptions[1].value));
    }
  }, [wallets, categories, categoryOptions]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (categoryId === 'new') {
      setIsNewCategory(true);
    } else {
      setIsNewCategory(false);
    }
  }, [categoryId]);

  const onChangeCategoryId = useCallback(
    (value: string) => {
      dispatch(addTransactionActions.setCategoryId(value));
    },
    [dispatch]
  );

  const onChangeWalletId = useCallback(
    (value: string) => {
      dispatch(addTransactionActions.setWalletId(value));
    },
    [dispatch]
  );

  const onChangeAmount = useCallback(
    (value: string) => {
      dispatch(addTransactionActions.setAmount(Number(value)));
    },
    [dispatch]
  );

  const onChangeDescription = useCallback(
    (value: string) => {
      dispatch(addTransactionActions.setDescription(value));
    },
    [dispatch]
  );

  const onChangeType = useCallback(
    (value: TransactionType) => {
      dispatch(addTransactionActions.setType(value));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (value: CurrencyCode) => {
      dispatch(addTransactionActions.setCurrency(value));
    },
    [dispatch]
  );

  const onAdd = () => {
    const newCategory = isNewCategory ? { name: newCategoryName, type, icon: newCategoryIcon } : undefined;
    dispatch(addTransaction({ date, type, walletId, categoryId, currency, description, amount, category: newCategory })).finally(() => {
      dispatch(addTransactionActions.setAmount(null));
    });
  };

  const handleDateChange = (range: Date) => {
    const date = new Date(range);
    const isoString = date.toISOString();

    dispatch(addTransactionActions.setDate(isoString));
  };

  const onChangeNewCategoryName = useCallback(
    (value: string) => {
      setNewCategoryName(value);
    },
    []
  );

  const onChangeNewCategoryIcon = useCallback(
    (value: string) => {
      setNewCategoryIcon(value);
    },
    []
  );

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.addTransactionForm, {}, [className])}>
        <div className={cls.titleWrapper}>
          <h2 className={cls.title}>{t('addTitle')}</h2>
          <div className={cls.controlsWrapper}>
            <Button theme={ThemeButton.GREY} active={type === 'expense'} onClick={() => { onChangeType('expense'); }}>{t('buttons.expense')}</Button>
            <Button theme={ThemeButton.GREY} active={type === 'income'} onClick={() => { onChangeType('income'); }}>{t('buttons.income')}</Button>
          </div>
        </div>
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
            {isNewCategory && (
              <>
                <Input
                  value={newCategoryName}
                  onChange={onChangeNewCategoryName}
                  label={t('category:labelName')}
                  placeholder={t('category:placeholderName')}
                />
                <Select
                  label={t('category:labelIcon')}
                  value={newCategoryIcon}
                  options={categoryIconOptions}
                  onChange={onChangeNewCategoryIcon}
                />
              </>
            )}
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
              onChange={onChangeCurrency}
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
            disabled={disabledBtn}
            onClick={onAdd}
            className={cls.button}
          >
            {t('buttons.add')}
          </Button>
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddTransactionForm;
