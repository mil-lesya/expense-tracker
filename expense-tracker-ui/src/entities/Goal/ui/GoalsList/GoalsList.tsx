import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GoalsList.module.scss';
import GoalListItem from '../GoalListItem/GoalListItem';
import { Goal } from 'entities/Goal/model/types/goal';

interface GoalsListProps {
  goals: Goal[]
  onClickEdit: (goal: Goal) => void
  onClickDelete: (goal: Goal) => void
  className?: string
}

const GoalsList: FC<GoalsListProps> = (props) => {
  const { className, goals, onClickEdit, onClickDelete } = props;

  return (
    <div className={classNames(cls.walletsList, {}, [className])}>
       { goals.map((item) => (
        <GoalListItem
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            key={item.id}
            goal={item}
        />
       )) }
    </div>
  );
};

export default GoalsList;
