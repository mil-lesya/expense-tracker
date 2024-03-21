import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Wallet {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  balance: number;

  @Column({ name: 'is_default' })
  isDefault: boolean;

  @Column({ name: 'is_show_balance' })
  isShowBalance: boolean;

  @Column({ name: 'is_show_on_panel' })
  isShowOnPanel: boolean;

  @ManyToOne(() => User, (user) => user.wallets, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @Column()
  currency: CurrencyCode;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];
}