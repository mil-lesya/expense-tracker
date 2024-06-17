import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(CurrencyCode)
  defaultCurrency: CurrencyCode;
}
