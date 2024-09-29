import { InjectRepository } from '@nestjs/typeorm';
import { FeatureRepository } from '../../domain/FeatureRepository';
import { FeatureT, FeatureToUpdate } from '../../domain/FeatureSchema';
import { TypeOrmFeatureEntity } from './TypeOrmFeatureEntity';
import { Repository } from 'typeorm';

export class TypeOrmFeatureRepository implements FeatureRepository {
  constructor(
    @InjectRepository(TypeOrmFeatureEntity)
    private readonly repository: Repository<TypeOrmFeatureEntity>,
  ) {}

  async create(payload: FeatureT): Promise<FeatureT> {
    return await this.repository.save(payload);
  }

  async getAll(): Promise<FeatureT[]> {
    return await this.repository.find();
  }

  async getOneById(id: string): Promise<FeatureT | null> {
    return await this.repository.findOneBy({ id });
  }

  async edit(id: string, feature: FeatureToUpdate): Promise<void> {
    await this.repository.save({ id, ...feature });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
