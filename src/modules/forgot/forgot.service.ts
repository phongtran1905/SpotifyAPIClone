import { Inject, Injectable } from '@nestjs/common';
import { ABaseService } from 'src/services/base/base.abstract.service';
import { Forgot } from './entities/forgot.entity';
import {
  FORGOT_REPOSITORY,
  ForgotRepository,
} from 'src/repositories/forgot.repository';

@Injectable()
export class ForgotService extends ABaseService<Forgot> {
  constructor(@Inject(FORGOT_REPOSITORY) forgotResitory: ForgotRepository) {
    super(forgotResitory);
  }
}
