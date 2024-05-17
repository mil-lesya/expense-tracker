import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Pagination.module.scss';
import { useTranslation } from 'react-i18next';
import Select, { ThemeSelect } from '../Select/ui/Select';
import { Button, ThemeButton } from '../Button';
import { SvgIcon } from '../SvgIcon';

interface PaginationProps {
  className?: string
  countRecords: number
  count: number // Общее количество записей
  totalPages: number // Всего страниц
  currentPage: number // Текущая страница
  onPageChange: (page: number) => void // Функция для обработки изменения страницы
  onRowsPerPageChange: (numberOfRows: number) => void // Функция для обработки изменения количества записей на странице
}

const Pagination: FC<PaginationProps> = (props) => {
  const {
    className,
    countRecords,
    count,
    totalPages,
    currentPage,
    onPageChange,
    onRowsPerPageChange
  } = props;

  const { t } = useTranslation();
  const [countRows, setCountRows] = useState(countRecords);

  const rowsPerPageOptions = [
    { value: '5', content: 5 },
    { value: '10', content: 10 },
    { value: '15', content: 15 },
    { value: '20', content: 20 }
  ];

  const indexOfFirstItem = (currentPage - 1) * countRows;
  const indexOfLastItem = Math.min(indexOfFirstItem + countRows, count);

  const onChangeCountRows = (value: string) => {
    const newValue = parseInt(value, 10);
    setCountRows(newValue);
    onRowsPerPageChange(newValue);
  };

  return (
    <div className={classNames(cls.pagination, {}, [className])}>
      <div className={cls.selectRows}>
        <span className={cls.showRows}>{t('pagination.showRows')}</span>
        <Select
            options={rowsPerPageOptions}
            value={`${countRows}`}
            theme={ThemeSelect.CLEAR}
            onChange={onChangeCountRows}
        />
      </div>

      <span className={cls.info}>
        {indexOfFirstItem + 1}-{indexOfLastItem} {t('pagination.of')} {count}
      </span>

      <div className={cls.buttons}>
        <Button
            onClick={() => { onPageChange(currentPage - 1); }}
            disabled={currentPage === 1}
            theme={ThemeButton.ICON}
        >
          <SvgIcon name='arrow-left' />
        </Button>
        <Button
            onClick={() => { onPageChange(currentPage + 1); }}
            disabled={currentPage === totalPages}
            theme={ThemeButton.ICON}
        >
          <SvgIcon name='arrow-right' />
        </Button>
      </div>

    </div>
  );
};

export default Pagination;
