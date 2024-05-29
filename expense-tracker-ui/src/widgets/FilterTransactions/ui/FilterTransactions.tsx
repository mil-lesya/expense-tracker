import React, { FC, useState, useEffect, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FilterTransactions.module.scss';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';
import OptionControl from 'shared/ui/OptionControl/OptionControl';
import SliderAmount from 'shared/ui/SliderAmount/SliderAmount';
import { useSelector } from 'react-redux';
import { getUserWallets } from 'entities/Wallet';
import { getCategoryExpense, getCategoryIncome } from 'entities/Category';

interface FilterTransactionsProps {
  className?: string
  onFiltersChange: (filters: {
    type?: string
    category?: string
    wallet?: string
    minAmount?: string
    maxAmount?: string
  }) => void
}

const FilterTransactions: FC<FilterTransactionsProps> = ({ className, onFiltersChange }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [typeExpense, setTypeExpense] = useState<boolean>(false);
  const [typeIncome, setTypeIncome] = useState<boolean>(false);
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<{ minAmount?: string, maxAmount?: string }>({});
  const [selectedExpenseCategories, setSelectedExpenseCategories] = useState<string[]>([]);
  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState<string[]>([]);

  const { i18n, t } = useTranslation(['transactions', 'category']);
  const wallets = useSelector(getUserWallets.selectAll);
  const categoryExpense = useSelector(getCategoryExpense);
  const categoryIncome = useSelector(getCategoryIncome);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => {
          resetSectionValues(s);
          return s !== section;
        })
        : [...prev, section]
    );
  };

  const resetSectionValues = (section: string) => {
    if (section === t('filter.typeTransactions')) {
      setTypeExpense(false);
      setTypeIncome(false);
    } else if (section === t('filter.wallets')) {
      setSelectedWallets([]);
    } else if (section === t('filter.amount')) {
      setAmountRange({});
    } else if (section === t('filter.expenseCategories')) {
      setSelectedExpenseCategories([]);
    } else if (section === t('filter.incomeCategories')) {
      setSelectedIncomeCategories([]);
    }
  };

  const updateFilters = useCallback(() => {
    const filters: any = {};
    if (expandedSections.includes(t('filter.typeTransactions'))) {
      filters.type = `${typeExpense ? 'expense' : ''}${
        typeExpense && typeIncome ? ',' : ''
      }${typeIncome ? 'income' : ''}`;
    }
    if (expandedSections.includes(t('filter.wallets'))) {
      filters.wallet = selectedWallets.join(',');
    }
    if (expandedSections.includes(t('filter.amount'))) {
      filters.minAmount = amountRange.minAmount;
      filters.maxAmount = amountRange.maxAmount;
    }
    const selectedCategories = [
      ...selectedExpenseCategories,
      ...selectedIncomeCategories
    ];
    if (expandedSections.includes(t('filter.expenseCategories')) || expandedSections.includes(t('filter.incomeCategories'))) {
      filters.category = selectedCategories.join(',');
    }
    onFiltersChange(filters);
  }, [typeExpense, typeIncome, selectedWallets, amountRange, selectedExpenseCategories, selectedIncomeCategories, expandedSections, onFiltersChange]);

  useEffect(() => {
    updateFilters();
  }, [typeExpense, typeIncome, selectedWallets, amountRange, selectedExpenseCategories, selectedIncomeCategories, expandedSections, updateFilters]);

  const handleWalletChange = (walletId: string, isChecked: boolean) => {
    setSelectedWallets((prev) =>
      isChecked ? [...prev, walletId] : prev.filter((id) => id !== walletId)
    );
  };

  const handleSliderChange = (value: { minAmount: string, maxAmount: string }) => {
    setAmountRange(value);
  };

  const handleCategoryChange = (
    categoryId: string,
    isChecked: boolean,
    isExpense: boolean
  ) => {
    if (isExpense) {
      setSelectedExpenseCategories((prev) =>
        isChecked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedIncomeCategories((prev) =>
        isChecked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)
      );
    }
  };

  const contentTypeTransactions = (
    <div className={cls.blockType}>
      <OptionControl
        title={t('filter.typeExpense')}
        inputType='checkbox'
        checked={typeExpense}
        textPositionRight
        onUpdateChecked={(val: boolean) => {
          setTypeExpense(val);
        }}
      />
      <OptionControl
        title={t('filter.typeIncome')}
        inputType='checkbox'
        checked={typeIncome}
        textPositionRight
        onUpdateChecked={(val: boolean) => {
          setTypeIncome(val);
        }}
      />
    </div>
  );

  const contentWallets = (
    <div className={cls.block}>
      {wallets.map((item) => (
        <OptionControl
          key={item.id}
          title={item.name}
          inputType='checkbox'
          checked={selectedWallets.includes(item.id)}
          textPositionRight
          onUpdateChecked={(val: boolean) => {
            handleWalletChange(item.id, val);
          }}
        />
      ))}
    </div>
  );

  const contentAmount = (
    <div className={cls.blockAmount}>
      <SliderAmount
        minAmount={0}
        maxAmount={1500}
        onChange={handleSliderChange}
      />
    </div>
  );

  const contentExpenseCategories = (
    <div className={cls.block}>
      {categoryExpense.map((item) => (
        <div key={item.id} className={cls.categoryItem}>
          <OptionControl
            title={i18n.exists(`category:${item.name}`) ? t(`category:${item.name}`) : item.name}
            inputType='checkbox'
            checked={selectedExpenseCategories.includes(item.id)}
            textPositionRight
            onUpdateChecked={(val: boolean) => {
              handleCategoryChange(item.id, val, true);
            }}
          />
          <SvgIcon name={item.icon} />
        </div>
      ))}
    </div>
  );

  const contentIncomeCategories = (
    <div className={cls.block}>
      {categoryIncome.map((item) => (
        <div key={item.id} className={cls.categoryItem}>
          <OptionControl
            title={i18n.exists(`category:${item.name}`) ? t(`category:${item.name}`) : item.name}
            inputType='checkbox'
            checked={selectedIncomeCategories.includes(item.id)}
            textPositionRight
            onUpdateChecked={(val: boolean) => {
              handleCategoryChange(item.id, val, false);
            }}
          />
          <SvgIcon name={item.icon} />
        </div>
      ))}
    </div>
  );

  const sections = [
    { title: t('filter.typeTransactions'), content: contentTypeTransactions },
    { title: t('filter.wallets'), content: contentWallets },
    { title: t('filter.amount'), content: contentAmount },
    { title: t('filter.expenseCategories'), content: contentExpenseCategories },
    { title: t('filter.incomeCategories'), content: contentIncomeCategories }
  ];

  return (
    <div className={classNames(cls.filterTransactions, {}, [className])}>
      <p className={cls.title}>{t('filter.title')}</p>
      {sections.map((section) => (
        <div key={section.title} className={cls.section}>
          <div className={cls.header} onClick={() => { toggleSection(section.title); }}>
            <span>{section.title}</span>
            <div className={cls.iconWrapper}>
              <SvgIcon
                name='plus'
                className={classNames(cls.icon, {
                  [cls.expanded]: expandedSections.includes(section.title)
                })}
              />
            </div>
          </div>
          <div
            className={classNames(cls.content, {
              [cls.expanded]: expandedSections.includes(section.title)
            })}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterTransactions;
