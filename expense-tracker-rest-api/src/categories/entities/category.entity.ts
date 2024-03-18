import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Limit } from '../../limit/entity/limit.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToOne(() => User, (user) => user.categories, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @OneToMany(() => Limit, (limit) => limit.category)
  limits: Limit[];
}