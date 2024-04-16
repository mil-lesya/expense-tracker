import { deleteWalletReducer } from './model/slice/deleteWalletSlice';
import { DeleteWalletSchema } from './model/types/deleteWalletSchema';
import { DeleteWalletModalAsync } from './ui/DeleteWalletModal.async';

export { DeleteWalletModalAsync as DeleteWalletModal, deleteWalletReducer, type DeleteWalletSchema };
