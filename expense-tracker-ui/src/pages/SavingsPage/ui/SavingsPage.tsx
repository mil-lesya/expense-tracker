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
import { getUserGoals, goalsReducer } from 'entities/Goal/model/slice/goalSlice';
import { getGoalsIsLoading } from 'entities/Goal/model/selectors/goal';
import { AddEditGoalModal, addEditGoalReducer } from 'features/AddEditGoal';
import { Goal } from 'entities/Goal/model/types/goal';
import { fetchGoals } from 'entities/Goal/model/services/fetchGoals';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { GoalsList } from 'entities/Goal';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';

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

  const [isAddEditGoalModal, setIsAddEditGoalModal] = useState(false);
  const [isDeleteGoalModal, setIsDeleteGoalModal] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [deleteGoal, setDeleteGoal] = useState(null);
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
    // setIsDeleteGoalModal((prev) => {
    //   if (prev) {
    //     store.reducerManager.remove('deleteWallet');
    //     dispatch({ type: '@DESTROY deleteWallet reducer' });
    //   } else {
    //     store.reducerManager.add('deleteWallet', deleteWalletReducer);
    //     dispatch({ type: '@INIT deleteWallet reducer' });
    //   }
    //   return !prev;
    // });
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
    dispatch(fetchGoals({ page: 1, limit: 10 }));
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

        {goals.length
          ? (<GoalsList
                goals={goals}
                onClickEdit={onOpenEditModal}
                onClickDelete={onDeleteModal}
              />)
          : (<EmptyBlock>{t('emptyList')}</EmptyBlock>)}
        </div>)}
        <AddEditGoalModal
          isEdit={isEdit}
          editGoalData={editGoal}
          isOpen={isAddEditGoalModal}
          onClose={onToggleAddEditModal}
        />
    </DynamicModuleLoader>
  );
};

export default SavingsPage;
