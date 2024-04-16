import { FC, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DeleteWalletModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getDeleteWalletError, getDeleteWalletIsLoading } from '../model/selectors/deleteWallet';
import toast from 'react-hot-toast';
import { deleteWallet } from '../model/services/deleteWallet';
import { Wallet } from 'entities/Wallet';

export interface DeleteWalletModalProps {
  isOpen: boolean
  onClose: () => void
  wallet?: Wallet
  className?: string
}

const DeleteWalletModal: FC<DeleteWalletModalProps> = (props) => {
  const { isOpen, onClose, wallet, className } = props;
  const { t } = useTranslation('wallets');

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getDeleteWalletIsLoading);
  const error = useSelector(getDeleteWalletError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onDelete = () => {
    if (wallet) {
      dispatch(deleteWallet({ id: wallet.id })).finally(() => { onClose(); });
    }
  };

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('modal.titleDelete')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.addEditWalletModal, {}, [className])}
      >
       <div className={cls.question}>{t('modal.deleteQuestion')}{wallet ? wallet.name : ''}?{t('modal.deleteWarning')}</div>
       <div className={cls.buttonsWrapper}>
        <Button theme={ThemeButton.OUTLINE} onClick={onClose} className={cls.button}>{t('modal.buttonCancel')}</Button>
        <Button theme={ThemeButton.PRIMARY} loading={isLoading} onClick={onDelete} className={cls.button}>{t('modal.buttonDelete')}</Button>
       </div>
    </Modal>
  );
};

export default DeleteWalletModal;
