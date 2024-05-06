import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWalletDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isDefault: boolean;

  @IsBoolean()
  @IsOptional()
  isShowBalance: boolean;

  @IsBoolean()
  @IsOptional()
  isShowOnPanel: boolean;

  @IsNumber()
  @IsOptional()
  balance: number;
}
