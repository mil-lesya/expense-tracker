import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

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

  @IsBoolean()
  @IsOptional()
  isConfirmed: boolean;
}
