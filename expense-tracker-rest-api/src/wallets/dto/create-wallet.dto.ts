import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { CurrencyCode } from '../../currency/enums/currency-code.enum';

export class CreateWalletDto {
  @IsString()
  name: string;

  @IsNumber()
  startingBalance: number;

  @IsBoolean()
  isDefault: boolean;

  @IsBoolean()
  isShowBalance: boolean;

  @IsBoolean()
  isShowOnPanel: boolean;

  @IsEnum(CurrencyCode)
  currencyCode: CurrencyCode;
}