import React, { useState, useEffect, memo } from 'react';
import cls from './OptionControl.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

type Checked = boolean | 'true' | 'false' | any[] | Set<any>;
export type InputType = 'toggle' | 'checkbox' | 'radio';

interface OptionControlProps {
  title: string // required
  subtitle?: string
  textless?: boolean
  inputType?: InputType
  name?: string
  value?: string | number
  checked?: Checked
  disabled?: boolean
  error?: boolean
  textPositionRight?: boolean
  dense?: boolean
  onUpdateChecked?: (value: Checked) => void
}

const OptionControl: React.FC<OptionControlProps> = ({
  title,
  subtitle = '',
  textless = false,
  inputType = 'toggle',
  name = '',
  value = '',
  checked = false,
  disabled = false,
  error = false,
  textPositionRight = false,
  dense = false,
  onUpdateChecked
}) => {
  const [isChecked, setIsChecked] = useState<Checked>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onUpdateChecked && onUpdateChecked(newChecked);
  };

  const getType = (): string => {
    return inputType === 'toggle' ? 'checkbox' : inputType;
  };

  const mods = {
    [cls.disabled]: disabled,
    [cls.error]: error,
    [cls.right]: textPositionRight,
    [cls.dense]: dense
  };

  return (
    <label className={classNames(cls.control, mods, [])} onClick={(e) => { e.stopPropagation(); }}>
      {subtitle && !textless
        ? (
        <span className={cls.head}>
          <span className={cls.title}>{title}</span>
          <span className={cls.subtitle}>{subtitle}</span>
        </span>
          )
        : (
        <span className={textless ? cls.visuallyHidden : cls.title}>{title}</span>
          )}
      <span className={cls.btn}>
        <input
          type={getType()}
          className={classNames(cls.input, { [cls[`${inputType}`]]: inputType }, [])}
          name={name}
          value={value}
          checked={typeof isChecked === 'boolean' ? isChecked : false}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className={cls.checkMark}></span>
      </span>
    </label>
  );
};

export default memo(OptionControl);
