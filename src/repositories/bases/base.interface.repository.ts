import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

export interface IBaseRepository<T> {
  saveOne(entity: T): Promise<T>;
  createOne(payload: DeepPartial<T>): Promise<T>;
  findOneByCondition(condition: FindOptionsWhere<T>): Promise<NullableType<T>>;
  findAll(): Promise<T[]>;
  updateOneByCondition(
    condition: FindOptionsWhere<T>,
    payload: DeepPartial<T>,
  ): Promise<T>;
  deleteOneByCondition(condition: FindOptionsWhere<T>): Promise<void>;
}
