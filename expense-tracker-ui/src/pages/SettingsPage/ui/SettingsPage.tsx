import { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SettingsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { CurrencyCode } from 'shared/const/common';
import Select from 'shared/ui/Select/ui/Select';
import OptionControl from 'shared/ui/OptionControl/OptionControl';

interface SettingsPageProps {
  className?: string
}

const options = [
  { value: CurrencyCode.RUB, content: CurrencyCode.RUB },
  { value: CurrencyCode.EUR, content: CurrencyCode.EUR },
  { value: CurrencyCode.USD, content: CurrencyCode.USD }
];

const SettingsPage: FC<SettingsPageProps> = (props) => {
  const { className } = props;
  const [currency, setCurrency] = useState<CurrencyCode>();

  const onChangeHandler = useCallback((value: CurrencyCode) => {
    setCurrency(value);
  }, [currency]);

  return (
    <>
      <PageHeader>Settings</PageHeader>
      <div className={classNames(cls.settingsPage, {}, [className])}>
        <OptionControl title='Toggle is now' inputType='checkbox' dense textPositionRight />
          <Select
            label='Укажите валюту'
            options={options}
            value={currency}
            onChange={onChangeHandler}
            readonly={false}
        />
      </div>
    </>
  );
};

export default SettingsPage;
