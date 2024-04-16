import { classNames } from 'shared/lib/classNames/classNames';
import { useState, useRef, memo } from 'react';
import cls from './Select.module.scss';
import Tippy from '@tippyjs/react';

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

const Select = (props: SelectProps) => {
  const {
    className,
    label,
    options,
    onChange,
    value,
    readonly
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const selectedOptionContent = options?.find(opt => opt.value === value)?.content || '';

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
                className={cls.option}
                onClick={() => { handleOptionClick(opt.value); }}
              >
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
        <div className={cls.selectWrapper}>
          <button
            className={cls.select}
            onClick={() => { setIsOpen(!isOpen); }}
            disabled={readonly}
            ref={selectRef}
          >
            {selectedOptionContent}
          </button>
        </div>
      </Tippy>
    </div>
  );
};

export default memo(Select);