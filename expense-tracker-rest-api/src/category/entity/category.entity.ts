import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { User } from '../../user/entity/user.entity';
import { Exclude } from 'class-transformer';
import { Limit } from '../../limit/entity/limit.entity';
import { CategoryType } from '../enum/category.type';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  icon: string;

  @Column()
  type: CategoryType;

  @ManyToOne(() => User, (user) => user.categories, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @OneToMany(() => Limit, (limit) => limit.category)
  limits: Limit[];
}
