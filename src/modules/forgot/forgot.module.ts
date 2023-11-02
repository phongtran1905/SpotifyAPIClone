import { Module } from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forgot } from './entities/forgot.entity';
import {
  FORGOT_REPOSITORY,
  ForgotRepository,
} from 'src/repositories/forgot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Forgot])],
  providers: [
    ForgotService,
    {
      provide: FORGOT_REPOSITORY,
      useClass: ForgotRepository,
    },
  ],
  exports: [ForgotService],
})
export class ForgotModule {}
