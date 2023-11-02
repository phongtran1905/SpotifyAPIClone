import { registerAs } from '@nestjs/config';

export interface MailerConfig {
  port: number;
  host: string;
}

export default registerAs<MailerConfig>('mailer', () => ({
  port: parseInt(process.env.MAIL_PORT),
  host: process.env.MAIL_HOST,
}));
