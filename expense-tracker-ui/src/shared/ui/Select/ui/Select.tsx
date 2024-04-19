import { classNames } from 'shared/lib/classNames/classNames';
import { useState, useRef, memo, useEffect } from 'react';
import cls from './Select.module.scss';
import Tippy from '@tippyjs/react';
import { SvgIcon } from 'shared/ui/SvgIcon';

export enum ThemeSelect {
  CLEAR = 'clear',
}
export interface SelectOption {
  value: string
  content: any
  icon?: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
  theme?: ThemeSelect
}

const Select = (props: SelectProps) => {
  const {
    className,
    label,
    options,
    onChange,
    value,
    readonly,
    theme
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const selectedOptionContent = options?.find(opt => opt.value === value)?.content || '';
  const selectedOptionIcon = options?.find(opt => opt.value === value)?.icon;

  const handleOptionClick = (value: string) => {
    if (onChange) {
      onChange(value);
    }
    setIsOpen(false);
  };

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <Tippy
        content={
          <div className={cls.options}>
            {options?.map(opt => (
              <div
                key={opt.value}
                className={classNames(cls.option, {}, [cls[theme]])}
                onClick={() => { handleOptionClick(opt.value); }}
              >
                {opt.icon && <SvgIcon name={opt.icon} className={cls.icon} />}
                {opt.content}
              </div>
            ))}
          </div>
        }
        visible={isOpen}
        onClickOutside={() => { setIsOpen(false); }}
        interactive={true}
        arrow={false}
        placement="bottom"
        reference={selectRef.current}
        appendTo={() => document.body}
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
        <div className={classNames(cls.selectWrapper, {}, [cls[theme]])}>
          <button
            className={cls.select}
            onClick={() => { setIsOpen(!isOpen); }}
            disabled={readonly}
            ref={selectRef}
          >
            <span className={cls.content}>{selectedOptionIcon && <SvgIcon name={selectedOptionIcon} className={cls.icon} />}{selectedOptionContent}</span>
            <SvgIcon name='triangle' className={classNames(cls.selectTriangle, { [cls.open]: isOpen }, [])} />
          </button>
        </div>
      </Tippy>
    </div>
  );
};

export default memo(Select);
