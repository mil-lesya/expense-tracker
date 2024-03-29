import { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from 'shared/ui/Portal';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const Modal: FC<ModalProps> = (props) => {
  const { className, children, isOpen, onClose } = props;

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen
  };

  const closeHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
        <div className={classNames(cls.modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
            <div className={cls.content} onClick={onContentClick}>
                <Button theme={ThemeButton.CLEAR} onClick={closeHandler} className={cls.closeButton}>
                    <SvgIcon name='close' className={cls.closeButtonIcon} />
                </Button>
                {children}
            </div>
        </div>
        </div>
    </Portal>
  );
};

export default Modal;
