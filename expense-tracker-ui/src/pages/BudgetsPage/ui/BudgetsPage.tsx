import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BudgetsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { BudgetCarusel, fetchBudgets, BudgetItemCarusel, BudgetPeriod, budgetsReducer, getUserBudgets } from 'entities/Budget';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { fetchReport, reportsReducer } from 'entities/Report';
import dayjs from 'dayjs';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { getUserLimits, limitsReducer, LimitItemCard, LimitList, fetchLimits } from 'entities/Limit';
import { AddEditBudgetModal } from 'features/AddEditBudget';
import { DeleteBudgetModal } from 'features/DeleteBudget';
import { AddEditLimitModal } from 'features/AddEditLimit';
import { DeleteLimitModal } from 'features/DeleteLimit';

const reducers: ReducersList = {
  budgets: budgetsReducer,
  reports: reportsReducer,
  limits: limitsReducer
};
interface BudgetsPageProps {
  className?: string
}

const BudgetsPage: FC<BudgetsPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation(['budgets', 'limits', 'category']);

  const budgetsItems = useSelector(getUserBudgets.selectAll);
  const limitsItems = useSelector(getUserLimits.selectAll);

  const [budgets, setBudgets] = useState<BudgetItemCarusel[]>([]);
  const [limits, setLimits] = useState<LimitItemCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [defaultPeriod, setDefaultPeriod] = useState<BudgetPeriod | 'all'>('all');
  const [currentBudget, setCurrentBudget] = useState<BudgetItemCarusel>();

  const [isAddBudgetModal, setIsAddBudgetModal] = useState(false);
  const [isDeleteBudgetModal, setIsDeleteBudgetModal] = useState(false);
  const [editBudget, setEditBudget] = useState(null);
  const [deleteBudget, setDeleteBudget] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [isAddEditLimitModal, setIsAddEditLimitModal] = useState(false);
  const [isDeleteLimitModal, setIsDeleteLimitModal] = useState(false);
  const [editLimit, setEditLimit] = useState(null);
  const [deleteLimit, setDeleteLimit] = useState(null);
  const [isEditLimit, setIsEditLimit] = useState(false);

  const getPeriodDates = (period: BudgetPeriod) => {
    const now = dayjs();
    switch (period) {
      case 'weekly':
        return {
          startDate: now.startOf('week').format('YYYY-MM-DD'),
          endDate: now.endOf('week').format('YYYY-MM-DD')
        };
      case 'monthly':
        return {
          startDate: now.startOf('month').format('YYYY-MM-DD'),
          endDate: now.endOf('month').format('YYYY-MM-DD')
        };
      case 'yearly':
        return {
          startDate: now.startOf('year').format('YYYY-MM-DD'),
          endDate: now.endOf('year').format('YYYY-MM-DD')
        };
      default:
        return {
          startDate: now.format('YYYY-MM-DD'),
          endDate: now.format('YYYY-MM-DD')
        };
    }
  };

  useEffect(() => {
    dispatch(fetchBudgets({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    if (limitsItems.length > 0 && currentBudget) {
      const fetchAllTransactions = async () => {
        const updatedLimits = await Promise.all(limitsItems.map(async (item) => {
          const { startDate, endDate } = getPeriodDates(currentBudget.period);
          const data = await dispatch(fetchReport({
            startDate,
            endDate,
            type: 'expense',
            category: item.category.id
          }));

          const amount = Math.abs(data.payload.totalBalance);
          const balance = item.amount - amount;
          return {
            id: item.id,
            amount,
            total: item.amount,
            balance,
            currency: currentBudget.currency,
            category: item.category
          };
        }));

        setLimits(updatedLimits);
      };

      fetchAllTransactions();
    } else if (!currentBudget) {
      setLimits([]);
    }
  }, [limitsItems, currentBudget, dispatch]);

  useEffect(() => {
    if (budgetsItems.length > 0) {
      const fetchAllTransactions = async () => {
        const updatedBudgets = await Promise.all(budgetsItems.map(async (item) => {
          const { startDate, endDate } = getPeriodDates(item.period);
          const data = await dispatch(fetchReport({
            startDate,
            endDate,
            type: 'expense'
          }));

          return { ...item, amount: Math.abs(data.payload.totalBalance), total: item.amount };
        }));

        setBudgets(updatedBudgets);
      };

      fetchAllTransactions();
    } else {
      setBudgets([]);
    }
  }, [budgetsItems, dispatch]);

  useEffect(() => {
    if (budgets.length > 0) {
      let budget: BudgetItemCarusel | undefined;
      if (currentIndex === 0) {
        budget = budgets.find((item) => item.period === 'weekly');
      } else if (currentIndex === 1) {
        budget = budgets.find((item) => item.period === 'monthly');
      } else if (currentIndex === 2) {
        budget = budgets.find((item) => item.period === 'yearly');
      }
      setCurrentBudget(budget);
      if (budget) {
        dispatch(fetchLimits(budget.id));
      }
    }
  }, [currentIndex, budgets]);

  const changeCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const onToggleAddModal = useCallback(() => {
    setIsAddBudgetModal((prev) => !prev);
    setIsEdit(false);
  }, []);

  const onToggleDeleteModal = useCallback(() => {
    setIsDeleteBudgetModal((prev) => !prev);
  }, []);

  const onToggleAddEditLimitModal = useCallback(() => {
    setIsAddEditLimitModal((prev) => !prev);
    setIsEditLimit(false);
  }, []);

  const onAddBudgetPeriod = useCallback((period: BudgetPeriod) => {
    setDefaultPeriod(period);
    onToggleAddModal();
  }, []);

  const onToggleDeleteLimitModal = useCallback(() => {
    setIsDeleteLimitModal((prev) => !prev);
  }, []);

  const onOpenEditModal = useCallback((budget: BudgetItemCarusel) => {
    setDefaultPeriod(budget.period);
    setIsEdit(true);
    setEditBudget({
      id: budget.id,
      amount: budget.total,
      name: budget.name,
      period: budget.period,
      currency: budget.currency
    });
    setIsAddBudgetModal(true);
  }, []);

  const onOpenDeleteModal = useCallback((budget: BudgetItemCarusel) => {
    setDeleteBudget({
      id: budget.id,
      amount: budget.total,
      name: budget.name,
      period: budget.period,
      currency: budget.currency
    });
    setIsDeleteBudgetModal(true);
  }, []);

  const onOpenEditLimitModal = useCallback((limit: LimitItemCard) => {
    setIsEditLimit(true);
    setEditLimit({
      id: limit.id,
      amount: limit.total,
      category: limit.category
    });
    setIsAddEditLimitModal(true);
  }, []);

  const onOpenDeleteLimitModal = useCallback((limit: LimitItemCard) => {
    setDeleteLimit({
      id: limit.id,
      amount: limit.total,
      category: limit.category
    });
    setIsDeleteLimitModal(true);
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageHeader>{t('budgets:title')}</PageHeader>
      <div className={classNames(cls.budgetsPage, {}, [className])}>
        {budgets.length > 0
          ? (
          <>
          <BudgetCarusel
            items={budgets}
            changeIndex={changeCurrentIndex}
            onAdd={onAddBudgetPeriod}
            onClickEdit={onOpenEditModal}
            onClickDelete={onOpenDeleteModal}
          />
          <div className={cls.limitsHeaderWrapper}>
            <div className={cls.limitsHeader}>
              <h3 className={cls.limitsTitle}>{t('limits:title')}</h3>
              <p className={cls.limitsInfo}>{t('limits:info')}</p>
            </div>
            {currentBudget && (<Button className={cls.btn} theme={ThemeButton.PRIMARY} onClick={onToggleAddEditLimitModal}>{t('limits:buttons.create')}</Button>)}
          </div>
          </>)
          : (
          <>
          <EmptyBlock>
            {t('budgets:emptyList')}
            <div className={cls.addWrapper}>
              <Button theme={ThemeButton.PRIMARY} onClick={() => { setDefaultPeriod('all'); onToggleAddModal(); }}>{t('budgets:buttons.create')}</Button>
            </div>
          </EmptyBlock>
          </>
            )}
        {limits.length > 0 && (<LimitList limits={limits} onClickEdit={onOpenEditLimitModal} onClickDelete={onOpenDeleteLimitModal} />)}
        {(limits.length === 0 && currentBudget) && (<EmptyBlock>{t('limits:emptyList')}</EmptyBlock>)}
      </div>
      <AddEditBudgetModal
        defaultPeriod={defaultPeriod}
        isOpen={isAddBudgetModal}
        onClose={onToggleAddModal}
        isEdit={isEdit}
        budgetData={editBudget}
      />
      <DeleteBudgetModal
        isOpen={isDeleteBudgetModal}
        onClose={onToggleDeleteModal}
        budget={deleteBudget}
      />
      <AddEditLimitModal
        isOpen={isAddEditLimitModal}
        onClose={onToggleAddEditLimitModal}
        isEdit={isEditLimit}
        limitData={editLimit}
        currentBudget={currentBudget}
      />
      <DeleteLimitModal
        isOpen={isDeleteLimitModal}
        onClose={onToggleDeleteLimitModal}
        limit={deleteLimit}
        budgetId={currentBudget?.id}
      />
    </DynamicModuleLoader>
  );
};

export default BudgetsPage;
