import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FilterReports.module.scss';
import DatePicker from 'shared/ui/DatePicker/DatePicker';
import { useTranslation } from 'react-i18next';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchWallets, getUserWallets, walletsReducer } from 'entities/Wallet';
import { categoryReducer, fetchCategory, getUserCategories } from 'entities/Category';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { transformToSelectOptions } from 'shared/lib/transformToSelect/transformToSelect';
import Select, { SelectOption } from 'shared/ui/Select/ui/Select';
import { ReportType } from 'entities/Report';

const initialReducers: ReducersList = {
  wallets: walletsReducer,
  category: categoryReducer
};

interface FilterReportsProps {
  className?: string
  type: ReportType
}

const FilterReports: FC<FilterReportsProps> = (props) => {
  const { className, type } = props;
  const { t } = useTranslation(['reports', 'category']);
  const dispatch = useAppDispatch();

  const wallets = useSelector(getUserWallets.selectAll);
  const categories = useSelector(getUserCategories.selectAll);

  const [date, setDate] = useState(new Date().toISOString());
  const [walletId, setWalletId] = useState('');
  const [walletOptions, setWalletOptions] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categoryOptions, setCategoryOptions] = useState(null);

  useEffect(() => {
    dispatch(fetchWallets({}));
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (wallets.length > 0) {
      const all: SelectOption = { value: 'all', content: t('filter.allWallets'), icon: 'credit-cards' };
      setWalletOptions([all, ...transformToSelectOptions(wallets, 'id', 'name', undefined, true)]);
    }
  }, [wallets]);

  useEffect(() => {
    if (categories.length > 0) {
      const all: SelectOption = { value: 'all', content: t('filter.allCategory'), icon: 'dashboard' };
      const categoryByType: SelectOption[] = categories.filter((item) => item.type === type).map(item => ({
        value: item.id,
        content: t(`category:${item.name}`),
        icon: item.icon ? item.icon : undefined,
        multiple: true
      }));

      setCategoryOptions([all, ...categoryByType]);
    }
  }, [categories, type]);

  const handleDateChange = (range: { startDate: Date, endDate: Date }) => {
    setDate(new Date(range.startDate).toISOString());
  };

  const onChangeWalletId = (value: string) => {
    console.log(value);
    setWalletId(value);
  };

  const onChangeCategoryId = (value: string) => {
    console.log(value);
    setCategoryId(value);
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
    <div className={classNames(cls.filterReports, {}, [className])}>
        <DatePicker
            initialDate={date}
            onDateChange={handleDateChange}
            label={t('filter.labelPeriod')}
            range
        />
        <Select
            label={t('filter.labelWallet')}
            value={walletId}
            options={walletOptions}
            onChange={onChangeWalletId}
        />
        <Select
            label={t('filter.labelCategory')}
            value={categoryId}
            options={categoryOptions}
            onChange={onChangeCategoryId}
            readonly={type === 'expense,income'}
        />
    </div>
    </DynamicModuleLoader>
  );
};

export default FilterReports;
