import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WalletsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { PageInfoBlock } from 'widgets/PageInfoBlock';
import { useTranslation } from 'react-i18next';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { getUserWallets, walletsReducer } from 'entities/Wallet/model/slice/walletSlice';
import { useSelector, useStore } from 'react-redux';
import { fetchWallets } from 'entities/Wallet/model/services/fetchWallets';
import { Wallet, WalletsList, getWalletsIsLoading } from 'entities/Wallet';
import { PageLoader } from 'shared/ui/PageLoader';
import { EmptyBlock } from 'shared/ui/EmptyBlock';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AddEditWalletModal } from 'features/AddEditWallet';
import { ReduxStoreWidthManager } from 'app/providers/StoreProvider';
import { addEditWalletReducer } from 'features/AddEditWallet/model/slice/addEditWalletSlice';
import { deleteWalletReducer } from 'features/DeleteWallet/model/slice/deleteWalletSlice';
import DeleteWalletModal from 'features/DeleteWallet/ui/DeleteWalletModal';

const reducers: ReducersList = {
  wallets: walletsReducer
};
interface WalletsPageProps {
  className?: string
}

const WalletsPage: FC<WalletsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('wallets');
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWidthManager;
  const wallets = useSelector(getUserWallets.selectAll);
  const walletsIsLoading = useSelector(getWalletsIsLoading);

  const [isAddEditWalletModal, setIsAddEditWalletModal] = useState(false);
  const [isDeleteWalletModal, setIsDeleteWalletModal] = useState(false);
  const [editWallet, setEditWallet] = useState(null);
  const [deleteWallet, setDeleteWallet] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const onToggleAddEditModal = useCallback(() => {
    setIsAddEditWalletModal((prev) => {
      if (prev) {
        store.reducerManager.remove('addEditWallet');
        dispatch({ type: '@DESTROY addEditWallet reducer' });
      } else {
        store.reducerManager.add('addEditWallet', addEditWalletReducer);
        dispatch({ type: '@INIT addEditWallet reducer' });
      }
      return !prev;
    });
    setIsEdit(false);
  }, []);

  const onToggleDeleteModal = useCallback(() => {
    setIsDeleteWalletModal((prev) => {
      if (prev) {
        store.reducerManager.remove('deleteWallet');
        dispatch({ type: '@DESTROY deleteWallet reducer' });
      } else {
        store.reducerManager.add('deleteWallet', deleteWalletReducer);
        dispatch({ type: '@INIT deleteWallet reducer' });
      }
      return !prev;
    });
  }, []);

  const onOpenEditModal = useCallback((wallet: Wallet) => {
    store.reducerManager.add('addEditWallet', addEditWalletReducer);
    dispatch({ type: '@INIT addEditWallet reducer' });
    setIsEdit(true);
    setEditWallet(wallet);
    setIsAddEditWalletModal(true);
  }, []);

  const onDeleteModal = useCallback((wallet: Wallet) => {
    setDeleteWallet(wallet);
    onToggleDeleteModal();
  }, []);

  useEffect(() => {
    dispatch(fetchWallets({ page: 1, limit: 10 }));
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageHeader>{t('title')}</PageHeader>
      {walletsIsLoading
        ? (<PageLoader></PageLoader>)
        : (<div className={classNames(cls.walletsPage, {}, [className])}>
       <PageInfoBlock
          buttonText={t('buttons.create')}
          onClick={onToggleAddEditModal}>
        {t('info')}
       </PageInfoBlock>
       {wallets.length
         ? (<WalletsList
              wallets={wallets}
              onClickEdit={onOpenEditModal}
              onClickDelete={onDeleteModal}
            />)
         : (<EmptyBlock>{t('emptyList')}</EmptyBlock>)}
      </div>)}
      <AddEditWalletModal
        isEdit={isEdit}
        editWalletData={editWallet}
        isOpen={isAddEditWalletModal}
        onClose={onToggleAddEditModal}
      />
      <DeleteWalletModal
        isOpen={isDeleteWalletModal}
        onClose={onToggleDeleteModal}
        wallet={deleteWallet}
      />
    </DynamicModuleLoader>
  );
};

export default WalletsPage;
