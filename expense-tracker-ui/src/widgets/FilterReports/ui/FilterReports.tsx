import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FilterReports.module.scss';
import DatePicker from 'shared/ui/DatePicker/DatePicker';
import { useTranslation } from 'react-i18next';
import { getUserWallets } from 'entities/Wallet';
import { getUserCategories } from 'entities/Category';
import { useSelector } from 'react-redux';
import { transformToSelectOptions } from 'shared/lib/transformToSelect/transformToSelect';
import Select, { SelectOption } from 'shared/ui/Select/ui/Select';
import { ReportType } from 'entities/Report';
import dayjs from 'dayjs';

interface FilterReportsProps {
  className?: string
  type: ReportType
  onChangeDate?: (startDate: string, endDate: string) => void
  onChangeWallets?: (value: string) => void
  onChangeCategories?: (value: string) => void
}

const FilterReports: FC<FilterReportsProps> = (props) => {
  const { className, type, onChangeDate, onChangeWallets, onChangeCategories } = props;
  const { t } = useTranslation(['reports', 'category']);

  const wallets = useSelector(getUserWallets.selectAll);
  const categories = useSelector(getUserCategories.selectAll);

  const [date, setDate] = useState(dayjs().startOf('month').toISOString());
  const [walletId, setWalletId] = useState('all');
  const [walletOptions, setWalletOptions] = useState(null);
  const [categoryId, setCategoryId] = useState('all');
  const [categoryOptions, setCategoryOptions] = useState(null);

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

  useEffect(() => {
    setCategoryId('all');
    setWalletId('all');
  }, [type]);

  const handleDateChange = (range: { startDate: Date, endDate: Date }) => {
    const start = new Date(range.startDate).toISOString();
    const end = new Date(range.endDate).toISOString();
    setDate(start);
    onChangeDate(start, end);
  };

  const onChangeWalletId = (value: string) => {
    setWalletId(value);
    if (value === 'all') {
      onChangeWallets('');
    } else {
      onChangeWallets(value);
    }
  };

  const onChangeCategoryId = (value: string) => {
    setCategoryId(value);
    if (value === 'all') {
      onChangeCategories('');
    } else {
      onChangeCategories(value);
    }
  };

  return (
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
  );
};

export default FilterReports;
