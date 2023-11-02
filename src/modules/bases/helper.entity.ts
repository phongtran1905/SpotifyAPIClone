import { instanceToPlain } from 'class-transformer';

export class HelperEntity {
  toJSON() {
    return instanceToPlain(this);
  }
}
