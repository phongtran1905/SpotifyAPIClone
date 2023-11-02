import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailData } from './interfaces/mail-data.interface';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async userRegister(mailData: MailData<{ hash: string }>): Promise<void> {
    await this.mailerService.sendMail({
      to: mailData.to,
      from: 'boilerplate@gmail.com',
      subject: 'Confirm Email',
      text: `Your code for confirming email is ${mailData.data.hash}`,
      html: `<p>Your code for confirming email is ${mailData.data.hash}</p>`,
    });
  }

  async userForgotPassword(
    mailData: MailData<{ hash: string }>,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: mailData.to,
      from: 'boilerplate@gmail.com',
      subject: 'Recovery code',
      text: `Your code for reseting password is ${mailData.data.hash}`,
      html: `<p>Your code for reseting password is ${mailData.data.hash}</p>`,
    });
  }
}
