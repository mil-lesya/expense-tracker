import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateWalletDto {
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
