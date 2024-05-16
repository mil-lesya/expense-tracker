import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SavingsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { Modal } from 'shared/ui/Modal';
import { Button, ThemeButton } from 'shared/ui/Button';
import { PageInfoBlock } from 'widgets/PageInfoBlock';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector, useStore } from 'react-redux';
import { ReduxStoreWidthManager } from 'app/providers/StoreProvider';
import { AddEditGoalModal, addEditGoalReducer } from 'features/AddEditGoal';
import { Goal } from 'entities/Goal/model/types/goal';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { GoalsList, getGoalsCompleted, getGoalsIsLoading, fetchGoals, getUserGoals, goalsReducer, getGoalsLimit, getGoalsCurrentPage, goalsActions } from 'entities/Goal';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { DeleteGoalModal, deleteGoalReducer } from 'features/DeleteGoal';
import { ChangeDepositedAmountGoalModal } from 'features/ChangeDepositedAmountGoal';

const reducers: ReducersList = {
  goals: goalsReducer
};

interface SavingsPageProps {
  className?: string
}

const SavingsPage: FC<SavingsPageProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation('savings');

  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWidthManager;
  const goals = useSelector(getUserGoals.selectAll);
  const goalsIsLoading = useSelector(getGoalsIsLoading);
  const isCompleted = useSelector(getGoalsCompleted);
  const limit = useSelector(getGoalsLimit);
  const currentPage = useSelector(getGoalsCurrentPage);

  const [isAddEditGoalModal, setIsAddEditGoalModal] = useState(false);
  const [isDeleteGoalModal, setIsDeleteGoalModal] = useState(false);
  const [isChangeDepositedAmountGoalModal, setIsChangeDepositedAmountGoalModal] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [deleteGoal, setDeleteGoal] = useState(null);
  const [changeAmountGoal, setChangeAmountGoal] = useState(null);
  const [isTakeFrom, setIsTakeFrom] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onToggleAddEditModal = useCallback(() => {
    setIsAddEditGoalModal((prev) => {
      if (prev) {
        store.reducerManager.remove('addEditGoal');
        dispatch({ type: '@DESTROY addEditGoal reducer' });
      } else {
        store.reducerManager.add('addEditGoal', addEditGoalReducer);
        dispatch({ type: '@INIT addEditGoal reducer' });
      }
      return !prev;
    });
    setIsEdit(false);
  }, []);

  const onToggleDeleteModal = useCallback(() => {
    setIsDeleteGoalModal((prev) => {
      if (prev) {
        store.reducerManager.remove('deleteGoal');
        dispatch({ type: '@DESTROY deleteGoal reducer' });
      } else {
        store.reducerManager.add('deleteGoal', deleteGoalReducer);
        dispatch({ type: '@INIT deleteGoal reducer' });
      }
      return !prev;
    });
  }, []);

  const onToggleChangeDepositedAmountModal = useCallback(() => {
    setIsChangeDepositedAmountGoalModal((prev) => !prev);
  }, []);

  const onOpenEditModal = useCallback((goal: Goal) => {
    store.reducerManager.add('addEditGoal', addEditGoalReducer);
    dispatch({ type: '@INIT addEditGoal reducer' });
    setIsEdit(true);
    setEditGoal(goal);
    setIsAddEditGoalModal(true);
  }, []);

  const onDeleteModal = useCallback((goal: Goal) => {
    setDeleteGoal(goal);
    onToggleDeleteModal();
  }, []);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [isCompleted]);

  const onChangeDepositedAmountModal = useCallback((goal: Goal, isTakeFrom: boolean) => {
    setChangeAmountGoal(goal);
    setIsTakeFrom(isTakeFrom);
    onToggleChangeDepositedAmountModal();
  }, []);

  const onChangeCompleted = useCallback((val: boolean) => {
    dispatch(goalsActions.setCompleted(val));
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageHeader>{t('title')}</PageHeader>
       {goalsIsLoading
         ? (<PageLoader></PageLoader>)
         : (<div className={classNames(cls.savingsPage, {}, [className])}>
        <PageInfoBlock
            buttonText={t('buttons.create')}
            onClick={onToggleAddEditModal}>
          {t('info')}
        </PageInfoBlock>
        <div className={cls.titleWrapper}>
          <p className={cls.title}>{t('listTitle')}</p>
          <div className={cls.controls}>
            <Button theme={ThemeButton.GREY} active={!isCompleted} onClick={() => { onChangeCompleted(false); }}>{t('buttons.active')}</Button>
            <Button theme={ThemeButton.GREY} active={isCompleted} onClick={() => { onChangeCompleted(true); }}>{t('buttons.completed')}</Button>
          </div>
        </div>

        {goals.length
          ? (<GoalsList
                goals={goals}
                onClickEdit={onOpenEditModal}
                onClickDelete={onDeleteModal}
                onClickChangeAmount={onChangeDepositedAmountModal}
              />)
          : (<EmptyBlock>{t('emptyList')}</EmptyBlock>)}
        </div>)}
        <AddEditGoalModal
          isEdit={isEdit}
          editGoalData={editGoal}
          isOpen={isAddEditGoalModal}
          onClose={onToggleAddEditModal}
        />
        <DeleteGoalModal
          isOpen={isDeleteGoalModal}
          onClose={onToggleDeleteModal}
          goal={deleteGoal}
        />
        <ChangeDepositedAmountGoalModal
          goal={changeAmountGoal}
          isOpen={isChangeDepositedAmountGoalModal}
          onClose={onToggleChangeDepositedAmountModal}
          isTakeFrom={isTakeFrom}
        />
    </DynamicModuleLoader>
  );
};

export default SavingsPage;
