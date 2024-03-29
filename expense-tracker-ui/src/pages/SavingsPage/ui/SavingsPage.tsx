import { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SavingsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { Modal } from 'shared/ui/Modal';
import { Button, ThemeButton } from 'shared/ui/Button';

interface SavingsPageProps {
  className?: string
}

const SavingsPage: FC<SavingsPageProps> = (props) => {
  const { className } = props;

  const [isCreateSavingModal, setIsCreateSavingModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsCreateSavingModal((prev) => !prev);
  }, []);

  return (
    <>
      <PageHeader>Savings</PageHeader>
      <div className={classNames(cls.savingsPage, {}, [className])}>
        <Button theme={ThemeButton.PRIMARY} onClick={onToggleModal}>Create</Button>
        {isCreateSavingModal && (
          <Modal isOpen={isCreateSavingModal} onClose={onToggleModal}>
            <div>
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default SavingsPage;
