import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { FieldPositionRepository } from '../../domain/field-position.repository';
import { TypeOrmFieldPositionEntity } from './type-orm-field-position.entity';
import { FieldPosition } from '../../domain/field-position';
import { FulfilledFieldPosition } from '../../domain/field-position.schema';

export class TypeOrmFieldPositionRepository implements FieldPositionRepository {
  constructor(
    @InjectRepository(TypeOrmFieldPositionEntity)
    private readonly repository: Repository<TypeOrmFieldPositionEntity>,
  ) {}
  async create(fieldPosition: FieldPosition): Promise<void> {
    await this.repository.save(fieldPosition);
  }
  async getAll(): Promise<FulfilledFieldPosition[]> {
    const result = await this.repository.find({
      order: { order: 'ASC' },
    });
    return result.map((u) => this.mapToDomain(u));
  }
  async getOneById(id: string): Promise<FulfilledFieldPosition> {
    const result = await this.repository.findOneBy({ id: id });

    if (!result) return null;

    return this.mapToDomain(result);
  }
  async edit(fieldPosition: FieldPosition): Promise<void> {
    await this.repository.update(fieldPosition.id, fieldPosition);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private mapToDomain(u: TypeOrmFieldPositionEntity) {
    return FulfilledFieldPosition.make({
      ...u,
    });
  }
}
