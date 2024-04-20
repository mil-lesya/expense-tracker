import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getPairConversion(from: string, to: string, amount: number) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get('API_DOMAIN')}${this.configService.get('API_KEY')}/pair/${from}/${to}/${amount}`,
      ),
    );
    return Math.round(response.data.conversion_result * 100) / 100;
  }
}
