import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { IBaseService } from './base.interface.service';
import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';
import { NullableType } from 'src/utils/types/nullable.type';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ABaseService<T> implements IBaseService<T> {
  protected constructor(protected readonly repository: IBaseRepository<T>) {}
  async findManyByCondition(condition: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.findManyByCondition(condition);
  }
  async exitOne(condition: FindOptionsWhere<T>): Promise<boolean> {
    return await this.repository.exitOne(condition);
  }

  async saveOne(entity: T): Promise<T> {
    return await this.repository.saveOne(entity);
  }

  async createOne(payload: DeepPartial<T>): Promise<T> {
    return await this.repository.createOne(payload);
  }

  async findOneByCondition(
    condition: FindOptionsWhere<T>,
  ): Promise<NullableType<T>> {
    return await this.repository.findOneByCondition(condition);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async updateOneByCondition(
    condition: FindOptionsWhere<T>,
    payload: DeepPartial<T>,
  ): Promise<NullableType<T>> {
    const existOne = await this.findOneByCondition(condition);

    if (!existOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.repository.updateOneByCondition(condition, payload);
  }

  async deleteOneByCondition(condition: FindOptionsWhere<T>): Promise<void> {
    const existOne = await this.findOneByCondition(condition);

    if (!existOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.deleteOneByCondition(condition);
  }
}
