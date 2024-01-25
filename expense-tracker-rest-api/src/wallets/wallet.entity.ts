import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CurrencyCode } from '../currency/enums/currency-code.enum';
import { User } from '../users/user.entity';

@Entity()
export class Wallet {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({name: 'starting_balance'})
  startingBalance: number;

  @Column({name: 'is_default'})
  isDefault: boolean;

  @Column({name: 'is_show_balance'})
  isShowBalance: boolean;

  @Column({name: 'is_show_on_panel'})
  isShowOnPanel: boolean;

  @ManyToOne(() => User, (user)=> user.wallets, {eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({name: 'currency_code'})
  currencyCode: CurrencyCode;
}