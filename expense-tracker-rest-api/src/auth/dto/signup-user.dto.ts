import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsString()
  username: string;

  @IsEnum(CurrencyCode)
  @IsOptional()
  defaultCurrency: CurrencyCode;
}
