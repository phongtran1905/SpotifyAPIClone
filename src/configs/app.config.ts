import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  domain: string;
}

export default registerAs<AppConfig>('app', () => ({
  port: parseInt(process.env.APP_PORT),
  domain: process.env.APP_DOMAIN,
}));
