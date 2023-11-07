import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import databaseConfig from './configs/database.config';
import appConfig from './configs/app.config';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserSessionsModule } from './modules/user-sessions/user-sessions.module';
import { MailsModule } from './modules/mails/mails.module';
import { ForgotModule } from './modules/forgot/forgot.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { GenresModule } from './modules/genres/genres.module';
import mailerConfig from './configs/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number(),
        APP_DOMAIN: Joi.string(),
        DATABASE_PORT: Joi.string(),
        DATABASE_USERNAME: Joi.string(),
        DATABASE_NAME: Joi.string(),
        DATABASE_PASSWORD: Joi.string(),
        DATABASE_TYPE: Joi.string(),
        DATABASE_HOST: Joi.string(),
        DATABASE_SYNCHRONIZE: Joi.string(),
        MAIL_PORT_CLIENT: Joi.number(),
        MAIL_PORT: Joi.number(),
        MAIL_HOST: Joi.string(),
      }),
      load: [appConfig, databaseConfig, mailerConfig],
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get('database.type', { infer: true }),
          host: configService.get('database.host', { infer: true }),
          port: +configService.get('database.port', { infer: true }),
          username: configService.get('database.username', { infer: true }),
          password: configService.get('database.password', { infer: true }),
          database: configService.get('database.database', { infer: true }),
          synchronize: configService.get('database.synchronize', {
            infer: true,
          }),
          entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    UserSessionsModule,
    MailsModule,
    ForgotModule,
    TracksModule,
    PlaylistsModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
