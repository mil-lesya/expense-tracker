import { IsBoolean } from 'class-validator';

export class UpdateWalletDto {
  @IsBoolean()
  isDefault: boolean;

  @IsBoolean()
  isShowBalance: boolean;

  @IsBoolean()
  isShowOnPanel: boolean;
}