import { NullableType } from 'joi';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

export interface IBaseService<T> {
  exitOne(condition: FindOptionsWhere<T>): Promise<boolean>;
  saveOne(entity: T): Promise<T>;
  createOne(payload: DeepPartial<T>): Promise<T>;
  findOneByCondition(condition: FindOptionsWhere<T>): Promise<NullableType<T>>;
  findAll(): Promise<T[]>;
  findManyByCondition(condition: FindOptionsWhere<T>): Promise<T[]>;
  updateOneByCondition(
    condition: FindOptionsWhere<T>,
    payload: DeepPartial<T>,
  ): Promise<T>;
  deleteOneByCondition(condition: FindOptionsWhere<T>): Promise<void>;
}
