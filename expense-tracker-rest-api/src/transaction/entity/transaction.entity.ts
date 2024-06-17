import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { Wallet } from '../../wallet/entity/wallet.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column('numeric')
  amount: number;

  @ManyToOne(() => Category, (category) => category.transactions, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, { eager: true })
  @JoinColumn({ name: 'wallet_id' })
  @Exclude()
  wallet: Wallet;

  @Column()
  currency: CurrencyCode;

  @Column()
  type: TransactionType;
}