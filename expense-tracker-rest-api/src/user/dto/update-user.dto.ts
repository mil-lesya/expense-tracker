import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enum/currency-code.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEnum(CurrencyCode)
  @IsOptional()
  defaultCurrency: CurrencyCode;
}
