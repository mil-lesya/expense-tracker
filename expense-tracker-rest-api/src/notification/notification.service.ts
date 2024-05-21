import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entity/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmMail(user: User, token: string) {
    const confirmLink = `${this.configService.get('FRONTEND_SERVER_URL')}/auth/confirm?token=${token}`;
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Confirm email',
        template: 'confirm.ejs',
        context: {
          username: user.username,
          confirmLink,
        },
      })
      .catch((e) => {
        throw new HttpException(
          JSON.stringify(e),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }

  async sendPasswordResetEmail(user: User, token: string) {
    const resetLink = `${this.configService.get('FRONTEND_SERVER_URL')}/auth/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      template: 'reset-password.ejs',
      context: { resetLink, username: user.username },
    });
  }
}
