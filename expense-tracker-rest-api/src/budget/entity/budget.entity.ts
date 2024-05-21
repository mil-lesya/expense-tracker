import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';
import { User } from '../../user/entity/user.entity';
import { Exclude } from 'class-transformer';
import { Limit } from '../../limit/entity/limit.entity';

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

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

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
