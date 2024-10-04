import { InjectRepository } from '@nestjs/typeorm';
import { FieldPositionRepository } from '../../domain/FieldPositionRepository';
import { TypeOrmFieldPositionEntity } from './TypeOrmFieldPositionEntity';
import { Repository } from 'typeorm';
import { FieldPosition } from '../../domain/FieldPosition';
import { FulfilledFieldPosition } from '../../domain/FieldPositionSchema';

export class TypeOrmFieldPositionRepository implements FieldPositionRepository {
  constructor(
    @InjectRepository(TypeOrmFieldPositionEntity)
    private readonly repository: Repository<TypeOrmFieldPositionEntity>,
  ) {}
  async create(fieldPosition: FieldPosition): Promise<void> {
    await this.repository.save(fieldPosition);
  }
  async getAll(): Promise<FulfilledFieldPosition[]> {
    const result = await this.repository.find();
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
