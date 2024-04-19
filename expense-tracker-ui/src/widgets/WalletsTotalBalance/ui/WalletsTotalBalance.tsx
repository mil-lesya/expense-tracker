import { FC, useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WalletsTotalBalance.module.scss';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { walletsTotalBalanceReducer } from '../model/slice/walletsTotalBalanceSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  getWalletsTotalBalanceNumber,
  getWalletsTotalBalanceCurrency,
  getWalletsTotalBalanceError,
  getWalletsTotalBalanceIsLoading
} from '../model/selectors/walletsTotalBalance';
import { getWalletsTotalBalance } from '../model/services/getWalletsTotalBalance';
import Tippy from '@tippyjs/react';

const initialReducers: ReducersList = {
  walletsTotalBalance: walletsTotalBalanceReducer
};

export enum ThemeWalletsTotalBalance {
  DARK = 'dark',
}
export interface WalletsTotalBalanceProps {
  className?: string
  theme?: ThemeWalletsTotalBalance
}

const WalletsTotalBalance: FC<WalletsTotalBalanceProps> = (props) => {
  const { className, theme } = props;
  const { t } = useTranslation('wallets');

  const dispatch = useAppDispatch();

  const totalBalance = useSelector(getWalletsTotalBalanceNumber);
  const currency = useSelector(getWalletsTotalBalanceCurrency);
  const isLoading = useSelector(getWalletsTotalBalanceIsLoading);
  const error = useSelector(getWalletsTotalBalanceError);

  const infoRef = useRef();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getWalletsTotalBalance());
  }, []);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
        {(isLoading || error)
          ? <></>
          : (
            <Tippy
              trigger='mouseenter'
              placement='bottom'
              reference={infoRef}
              content={
                <div className={cls.info}>{t('totalBalanceInfo')}</div>
              }
              popperOptions={{
                modifiers: [
                  {
                    name: 'matchWidth',
                    enabled: true,
                    phase: 'beforeWrite',
                    requires: ['computeStyles'],
                    fn: ({ state }) => {
                      if (state.elements.reference instanceof HTMLElement) {
                        state.styles.popper.width = `${state.elements.reference.offsetWidth}px`;
                      }
                    },
                    effect: ({ state }) => {
                      if (state.elements.reference instanceof HTMLElement) {
                        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
                      }
                      return () => {};
                    }
                  }
                ]
              }}
            >
                <div ref={infoRef} className={classNames(cls.walletsTotalBalance, {}, [className, cls[theme]])}>
                    <h2 className={cls.title}>{t('totalBalance')}</h2>
                    <div>{totalBalance} {currency}</div>
                </div>
            </Tippy>
            )}
    </DynamicModuleLoader>
  );
};

export default WalletsTotalBalance;
