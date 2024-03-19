import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Budget } from '../../budget/entity/budget.entity';

@Entity()
export class Limit {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric')
  amount: number;

  @ManyToOne(() => Budget, (budget) => budget.limits, {eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'budget_id' })
  @Exclude()
  budget: Budget

  @ManyToOne(() => Category, (category) => category.limits, {eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category
}