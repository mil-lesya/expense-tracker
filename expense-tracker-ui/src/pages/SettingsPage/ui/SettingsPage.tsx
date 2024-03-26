import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SettingsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface SettingsPageProps {
  className?: string
}

const SettingsPage: FC<SettingsPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Settings</PageHeader>
      <div className={classNames(cls.settingsPage, {}, [className])}>
        <p>settingsPage</p>
      </div>
    </>
  );
};

export default SettingsPage;
