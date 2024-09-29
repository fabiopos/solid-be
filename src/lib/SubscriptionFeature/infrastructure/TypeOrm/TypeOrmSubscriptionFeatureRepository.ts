import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
  SubscriptionUpdateType,
} from '../../domain/SubscriptionFeatureSchema';
import { SubscriptionFeatureRepository } from '../../domain/SubscriptionFeatureRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmSubscriptionFeatureEntity } from './TypeOrmSubscriptionFeatureEntity';
import { Repository } from 'typeorm';

export class TypeOrmSubscriptionFeatureRepository
  implements SubscriptionFeatureRepository
{
  constructor(
    @InjectRepository(TypeOrmSubscriptionFeatureEntity)
    private readonly repository: Repository<TypeOrmSubscriptionFeatureEntity>,
  ) {}

  async create(
    subFeature: SubscriptionFeatureCreateType,
  ): Promise<SubscriptionFeatureType> {
    const result = await this.repository.save(subFeature);
    return result;
  }

  async createItems(
    subFeature: SubscriptionFeatureCreateType[],
  ): Promise<SubscriptionFeatureType[]> {
    const result = await this.repository.save(subFeature);
    return result;
  }

  async getAll(): Promise<SubscriptionFeatureType[]> {
    return await this.repository.find();
  }
  async getOneById(id: string): Promise<SubscriptionFeatureType> {
    return await this.repository.findOne({ where: { id } });
  }
  async edit(id: string, payload: SubscriptionUpdateType): Promise<void> {
    await this.repository.save({ id, ...payload });
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
