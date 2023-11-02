import { NullableType } from 'joi';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

export interface IBaseService<T> {
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
