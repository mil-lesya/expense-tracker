import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Wallet } from '../wallets/wallet.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];
}