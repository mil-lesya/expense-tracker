import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEnum(CurrencyCode)
  @IsOptional()
  defaultCurrency: CurrencyCode;
}
