import { FC, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DeleteLimitModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getDeleteLimitError, getDeleteLimitIsLoading } from '../model/selectors/deleteLimit';
import toast from 'react-hot-toast';
import { deleteLimit } from '../model/services/deleteLimit';
import { Limit } from 'entities/Limit';

export interface DeleteLimitModalProps {
  isOpen: boolean
  onClose: () => void
  limit?: Limit
  budgetId?: string
  className?: string
}

const DeleteLimitModal: FC<DeleteLimitModalProps> = (props) => {
  const { isOpen, onClose, limit, budgetId, className } = props;
  const { t } = useTranslation(['limits', 'category']);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getDeleteLimitIsLoading);
  const error = useSelector(getDeleteLimitError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onDelete = () => {
    if (limit) {
      dispatch(deleteLimit({ id: limit.id, budgetId })).finally(() => { onClose(); });
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
       <div className={cls.question}>{t('modal.deleteQuestion')}{limit ? t(`category:${limit.category.name}`) : ''}?{t('modal.deleteWarning')}</div>
       <div className={cls.buttonsWrapper}>
        <Button theme={ThemeButton.OUTLINE} onClick={onClose} className={cls.button}>{t('modal.buttonCancel')}</Button>
        <Button theme={ThemeButton.PRIMARY} loading={isLoading} onClick={onDelete} className={cls.button}>{t('modal.buttonDelete')}</Button>
       </div>
    </Modal>
  );
};

export default DeleteLimitModal;
