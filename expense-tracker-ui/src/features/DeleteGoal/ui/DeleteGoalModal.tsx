import { FC, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DeleteGoalModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getDeleteWalletError, getDeleteWalletIsLoading } from '../model/selectors/deleteGoal';
import toast from 'react-hot-toast';
import { deleteGoal } from '../model/services/deleteGoal';
import { Goal } from 'entities/Goal';

export interface DeleteGoalModalProps {
  isOpen: boolean
  onClose: () => void
  goal?: Goal
  className?: string
}

const DeleteGoalModal: FC<DeleteGoalModalProps> = (props) => {
  const { isOpen, onClose, goal, className } = props;
  const { t } = useTranslation('savings');

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getDeleteWalletIsLoading);
  const error = useSelector(getDeleteWalletError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onDelete = () => {
    if (goal) {
      dispatch(deleteGoal({ id: goal.id })).finally(() => { onClose(); });
    }
  };

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('modal.titleDelete')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.deleteWalletModal, {}, [className])}
      >
       <div className={cls.question}>{t('modal.deleteQuestion')}{goal ? goal.name : ''}?{t('modal.deleteWarning')}</div>
       <div className={cls.buttonsWrapper}>
        <Button theme={ThemeButton.OUTLINE} onClick={onClose} className={cls.button}>{t('modal.buttonCancel')}</Button>
        <Button theme={ThemeButton.PRIMARY} loading={isLoading} onClick={onDelete} className={cls.button}>{t('modal.buttonDelete')}</Button>
       </div>
    </Modal>
  );
};

export default DeleteGoalModal;
