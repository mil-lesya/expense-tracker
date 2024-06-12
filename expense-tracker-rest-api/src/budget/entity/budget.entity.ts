import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';
import { User } from '../../user/entity/user.entity';
import { Exclude } from 'class-transformer';
import { Limit } from '../../limit/entity/limit.entity';
import { Period } from '../enum/period.enum';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric')
  amount: number;

  @Column()
  currency: CurrencyCode;

  @Column()
  period: Period;

  @OneToMany(() => Limit, (limit) => limit.budget)
  limits: Limit[];

  @ManyToOne(() => User, (user) => user.budgets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;
}
