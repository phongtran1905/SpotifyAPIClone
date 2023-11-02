import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IBaseRepository } from './base.interface.repository';
import { NullableType } from 'src/utils/types/nullable.type';

export abstract class ABaseRepository<T> implements IBaseRepository<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async saveOne(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async createOne(payload: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findOneByCondition(
    condition: FindOptionsWhere<T>,
  ): Promise<NullableType<T>> {
    return await this.repository.findOneBy(condition);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async updateOneByCondition(
    condition: FindOptionsWhere<T>,
    payload: DeepPartial<T>,
  ): Promise<T> {
    const entity = await this.repository.findOneBy(condition);
    if (entity) {
      Object.assign(entity, payload);
      return await this.repository.save(entity);
    }
    return entity;
  }

  async deleteOneByCondition(condition: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(condition);
  }
}
