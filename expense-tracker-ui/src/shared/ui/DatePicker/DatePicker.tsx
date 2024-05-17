import React, { useEffect, useState } from 'react';
import { Calendar, DateRangePicker } from 'react-date-range';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css';
import './custom.css';

import { ru, enUS } from 'date-fns/locale';

import cls from './DatePicker.module.scss';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '../SvgIcon';
import { classNames } from 'shared/lib/classNames/classNames';

interface DatePickerProps {
  label?: string
  minDate?: Date
  maxDate?: Date
  initialDate?: string
  range?: boolean
  readonly?: boolean
  onDateChange?: (range?: { startDate: Date, endDate: Date } | Date) => void
}

const BaseDatePicker: React.FC<DatePickerProps> = ({ label, initialDate = new Date(), range = false, onDateChange, minDate, maxDate, readonly = false }) => {
  const [stateRange, setStateRange] = useState([{
    startDate: new Date(initialDate),
    endDate: range ? new Date() : new Date(initialDate),
    key: 'selection'
  }]);
  const [stateDate, setStateDate] = useState(new Date(initialDate));
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [locale, setLocale] = useState(enUS);
  const { i18n } = useTranslation();

  useEffect(() => {
    const newDate = new Date(initialDate);
    if (!isNaN(newDate.getTime()) && newDate.getTime() !== stateDate.getTime()) {
      setStateDate(newDate);
      const newRange = {
        startDate: newDate,
        endDate: range ? new Date() : newDate,
        key: 'selection'
      };

      // Более надежное сравнение объектов дат
      if (
        stateRange[0].startDate.getTime() !== newRange.startDate.getTime() ||
        stateRange[0].endDate.getTime() !== newRange.endDate.getTime()
      ) {
        setStateRange([newRange]);
      }
    }
  }, [initialDate, range]);

  useEffect(() => {
    setLocale(i18n.language === 'ru' ? ru : enUS);
  }, [i18n.language]);

  const handleSelect = (ranges: any) => {
    if (!readonly) {
      if (range) {
        setStateRange([ranges.selection]);
        onDateChange && onDateChange({
          startDate: ranges.selection.startDate,
          endDate: ranges.selection.endDate
        });
      } else {
        setStateDate(ranges);
        onDateChange && onDateChange(ranges);
      }
      setPickerVisible(!range);
    }
  };

  const formattedDate = range
    ? `${dayjs(stateRange[0].startDate).format('DD MMM YYYY')} - ${dayjs(stateRange[0].endDate).format('DD MMM YYYY')}`
    : dayjs(stateDate).format('DD MMM YYYY');

  return (
    <>
    <div className={cls.datePicker}>
    {label && <span className={cls.label}>{label}</span>}
    <Tippy
        content={
            range
              ? (
          <DateRangePicker
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={stateRange}
            direction="horizontal"
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
          />)
              : (
            <Calendar
            onChange={handleSelect}
            date={stateDate}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}/>
                )
        }
        visible={isPickerVisible && !readonly}
        onClickOutside={() => { setPickerVisible(false); }}
        interactive
      >
        <div className={classNames(cls.buttonWrapper, { [cls.readonly]: readonly }, [])}>
          <button
            className={cls.button}
            onClick={() => { setPickerVisible(!isPickerVisible); }}>
            <SvgIcon name='calendar' className={cls.icon} />
            <span className={cls.date}>{formattedDate}</span>
          </button>
        </div>
      </Tippy>
    </div>
    </>
  );
};

export default BaseDatePicker;
