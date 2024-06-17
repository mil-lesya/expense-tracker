import { FC, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DeleteBudgetModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getDeleteBudgetError, getDeleteBudgetIsLoading } from '../model/selectors/deleteBudget';
import toast from 'react-hot-toast';
import { deleteBudget } from '../model/services/deleteBudget';
import { Budget } from 'entities/Budget';

export interface DeleteBudgetModalProps {
  isOpen: boolean
  onClose: () => void
  budget?: Budget
  className?: string
}

const DeleteBudgetModal: FC<DeleteBudgetModalProps> = (props) => {
  const { isOpen, onClose, budget, className } = props;
  const { t } = useTranslation('budgets');

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getDeleteBudgetIsLoading);
  const error = useSelector(getDeleteBudgetError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onDelete = () => {
    if (budget) {
      dispatch(deleteBudget({ id: budget.id })).finally(() => { onClose(); });
    }
  };

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('modal.titleDelete')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.deleteBudgetModal, {}, [className])}
      >
       <div className={cls.question}>{t('modal.deleteQuestion')}{budget ? budget.name : ''}?{t('modal.deleteWarning')}</div>
       <div className={cls.buttonsWrapper}>
        <Button theme={ThemeButton.OUTLINE} onClick={onClose} className={cls.button}>{t('modal.buttonCancel')}</Button>
        <Button theme={ThemeButton.PRIMARY} loading={isLoading} onClick={onDelete} className={cls.button}>{t('modal.buttonDelete')}</Button>
       </div>
    </Modal>
  );
};

export default DeleteBudgetModal;
