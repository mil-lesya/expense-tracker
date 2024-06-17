import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Category } from '../../category/entity/category.entity';
import { Wallet } from '../../wallet/entity/wallet.entity';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';
import { Goal } from '../../goal/entity/goal.entity';
import { Budget } from '../../budget/entity/budget.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'default_currency' })
  defaultCurrency: CurrencyCode;

  @Column({ name: 'is_confirmed', nullable: true })
  isConfirmed: boolean;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];
}
