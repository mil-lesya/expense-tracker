import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric', { name: 'goal_amount' })
  goalAmount: number;

  @Column()
  currency: CurrencyCode;

  @Column({ name: 'target_date', nullable: true })
  targetDate: Date;

  @Column('numeric', { name: 'deposited_amount' })
  depositedAmount: number;

  @Column({ name: 'is_completed' })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.goals, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @Column({ nullable: true })
  image: string;
}
