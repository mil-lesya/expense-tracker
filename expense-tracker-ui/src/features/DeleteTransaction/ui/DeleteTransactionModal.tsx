import { FC, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DeleteTransactionModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getDeleteTransactionError, getDeleteTransactionIsLoading } from '../model/selectors/deleteWallet';
import toast from 'react-hot-toast';
import { deleteTransaction } from '../model/services/deleteTransaction';
import { Transaction } from 'entities/Transaction';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { deleteTransactionReducer } from '../model/slice/deleteTransactionSlice';

const initialReducers: ReducersList = {
  deleteTransaction: deleteTransactionReducer
};

export interface DeleteTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction
  currentPage: number
  limit: number
  className?: string
}

const DeleteTransactionModal: FC<DeleteTransactionModalProps> = (props) => {
  const { isOpen, onClose, transaction, currentPage, limit, className } = props;
  const { t } = useTranslation('transactions');

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getDeleteTransactionIsLoading);
  const error = useSelector(getDeleteTransactionError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onDelete = () => {
    if (transaction) {
      dispatch(deleteTransaction({ id: transaction.id, currentPage, limit })).finally(() => { onClose(); });
    }
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={t('modal.titleDelete')}
          subtitle={t('modal.subtitle')}
          className={classNames(cls.deleteTransactionModal, {}, [className])}
        >
        <div className={cls.question}>{t('modal.deleteQuestion')}?{t('modal.deleteWarning')}</div>
        <div className={cls.buttonsWrapper}>
          <Button theme={ThemeButton.OUTLINE} onClick={onClose} className={cls.button}>{t('modal.buttonCancel')}</Button>
          <Button theme={ThemeButton.PRIMARY} loading={isLoading} onClick={onDelete} className={cls.button}>{t('modal.buttonDelete')}</Button>
        </div>
      </Modal>
    </DynamicModuleLoader>
  );
};

export default DeleteTransactionModal;
