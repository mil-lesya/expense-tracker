import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';

interface Column<T> {
  key: keyof T
  title: string
  render?: (value: T[keyof T], item: T) => React.ReactNode
}

// Определение типов для пропсов компонента Table
interface TableProps<T> {
  className?: string
  data: T[]
  columns: Array<Column<T>>
}

const Table: FC<TableProps<any>> = (props) => {
  const { data, columns, className } = props;

  return (
    <div className={classNames(cls.table, {}, [className])}>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellData = item[col.key];
                return (
                  <td key={colIndex}>
                    {col.render ? col.render(cellData, item) : cellData}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
