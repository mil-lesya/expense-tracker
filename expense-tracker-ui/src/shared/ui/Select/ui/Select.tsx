import { classNames } from 'shared/lib/classNames/classNames';
import { useState, useRef, memo, useEffect } from 'react';
import cls from './Select.module.scss';
import Tippy from '@tippyjs/react';
import { SvgIcon } from 'shared/ui/SvgIcon';
import OptionControl from 'shared/ui/OptionControl/OptionControl';
import { useTranslation } from 'react-i18next';

export enum ThemeSelect {
  CLEAR = 'clear',
}
export interface SelectOption {
  value: string
  content: any
  icon?: string
  multiple?: boolean
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

  const { t } = useTranslation();

  // const selectedOptionContent = options?.find(opt => opt.value === value)?.content || '';
  // const selectedOptionIcon = options?.find(opt => opt.value === value)?.icon;

  const [selectedValues, setSelectedValues] = useState(new Set<string>());

  useEffect(() => {
    if (value && options) {
      setSelectedValues(new Set(value.split(',')));
    }
  }, [value, options]);

  const handleOptionClick = (value: string, isMultiSelect: boolean) => {
    setSelectedValues(prevSelectedValues => {
      const newSelectedValues = new Set(prevSelectedValues);

      if (isMultiSelect) {
        // Проверяем, есть ли в выбранных значениях опции без множественного выбора
        const nonMultiSelectSelected = Array.from(newSelectedValues).find(val => {
          const opt = options.find(opt => opt.value === val);
          return opt && !opt.multiple; // Опция без поддержки множественного выбора
        });

        if (nonMultiSelectSelected) {
        // Если такие опции есть, очищаем все выбранные значения
          newSelectedValues.clear();
        }
        // Если опция поддерживает множественный выбор
        if (newSelectedValues.has(value)) {
          newSelectedValues.delete(value); // Убираем значение, если оно уже выбрано
        } else {
          newSelectedValues.add(value); // Добавляем значение, если его нет в выбранных
        }
      } else {
        newSelectedValues.clear();
        newSelectedValues.add(value); // Очищаем выбранные и добавляем текущую опцию
      }

      if (onChange) {
        onChange(Array.from(newSelectedValues).join(',')); // Обновляем внешний стейт
      }

      return newSelectedValues;
    });
  };

  const selectDisplayContent = () => {
    // Проверяем, есть ли выбранные множественные опции
    const multiSelectOptions = Array.from(selectedValues).filter(val => {
      const opt = options.find(opt => opt.value === val && opt.multiple);
      return opt !== undefined;
    });

    if (multiSelectOptions.length > 0) {
      // Множественный выбор: отображаем количество и иконку для очистки
      return (
        <span className={cls.content}>
          <span>{`${t('select')}: ${multiSelectOptions.length} `}</span>
          <div onClick={() => { setSelectedValues(new Set()); }} className={classNames(cls.icon, {}, [cls.close])}><SvgIcon name="close" /></div>
        </span>
      );
    } else if (selectedValues.size === 1) {
      // Одиночный выбор: отображаем иконку и содержимое выбранной опции
      const selectedValue = Array.from(selectedValues)[0];
      const selectedOption = options.find(opt => opt.value === selectedValue);
      return (
        <span className={cls.content}>
          {selectedOption?.icon && <SvgIcon name={selectedOption.icon} className={cls.icon} />}
          {selectedOption?.content}
        </span>
      );
    }

    // Если ничего не выбрано
    return <span className={cls.content}>Выберите опцию</span>;
  };

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <Tippy
        content={
          <div className={cls.options}>
            {options?.map(opt => (
              opt.multiple
                ? (
                  <div
                  key={opt.value}
                  className={classNames(cls.option, {}, [cls[theme]])}
                  onClick={() => { handleOptionClick(opt.value, true); }}
                >
                  <OptionControl
                    title={opt.content}
                    inputType="checkbox"
                    textPositionRight
                    checked={selectedValues.has(opt.value)}
                    onUpdateChecked={() => { handleOptionClick(opt.value, true); }}
                  />
                  {opt.icon && <SvgIcon name={opt.icon} className={cls.iconMultiple} />}
                </div>
                  )
                : (
                <div
                  key={opt.value}
                  className={classNames(cls.option, {}, [cls[theme]])}
                  onClick={() => { handleOptionClick(opt.value, false); }}
                >
                  {opt.icon && <SvgIcon name={opt.icon} className={cls.icon} />}
                  {opt.content}
                </div>
                  )
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
            {selectDisplayContent()}
            <SvgIcon name="triangle" className={classNames(cls.selectTriangle, { [cls.open]: isOpen }, [])} />
          </button>
        </div>
      </Tippy>
    </div>
  );
};

export default memo(Select);
