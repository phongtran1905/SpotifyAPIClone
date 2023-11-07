import { Injectable } from '@nestjs/common';
import { ABaseRepository } from './bases/base.abstract.repository';
import { Forgot } from 'src/modules/forgot/entities/forgot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IForgotRepository } from 'src/modules/forgot/interfaces/forgot.repository.interface';

export const FORGOT_REPOSITORY = 'forgot_repository';
@Injectable()
export class ForgotRepository
  extends ABaseRepository<Forgot>
  implements IForgotRepository
{
  constructor(@InjectRepository(Forgot) forgotRepository: Repository<Forgot>) {
    super(forgotRepository);
  }
}
