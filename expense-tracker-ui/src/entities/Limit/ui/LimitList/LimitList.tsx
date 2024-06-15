import { FC } from 'react';
import cls from './LimitList.module.scss';
import { LimitItemCard } from 'entities/Limit/model/types/limit';
import LimitListItem from '../LimitListItem/LimitListItem';

interface LimitListProps {
  limits: LimitItemCard[]
  onClickEdit: (limit: LimitItemCard) => void
  onClickDelete: (limit: LimitItemCard) => void
}

const LimitList: FC<LimitListProps> = (props) => {
  const { limits, onClickEdit, onClickDelete } = props;

  return (
    <>
        <div className={cls.limitsList}>
          {limits.map((item) => (
            <LimitListItem item={item} key={item.id} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
          ))}
        </div>
    </>
  );
};

export default LimitList;
