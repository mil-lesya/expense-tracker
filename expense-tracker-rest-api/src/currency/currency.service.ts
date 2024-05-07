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

  async getPairConversion(
    from: string,
    to: string,
    amount: number,
  ): Promise<number> {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get('EXCHANGE_API')}${this.configService.get('API_KEY')}/pair/${from}/${to}/${amount}`,
      ),
    );
    return response.data.conversion_result;
  }
}
