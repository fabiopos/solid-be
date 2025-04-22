import { FeatureRepository } from '../lib/feature/domain/feature.repository';
import {
  FeatureT,
  FeatureToUpdate,
} from '../lib/feature/domain/feature.schema';

export class FeatureRepositoryMock implements FeatureRepository {
  private _id: string;
  private _feature: FeatureToUpdate;

  async getAll(): Promise<FeatureT[]> {
    return [];
  }

  async getOneById(id: string): Promise<FeatureT> {
    this._id = id;
    return {
      id,
      name: 'Mock feature',
      description: 'Mock feature description',
      defaultMax: 10,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async create(payload: FeatureT): Promise<FeatureT> {
    return {
      ...payload,
      id: payload.id ?? 'mock-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async edit(id: string, feature: FeatureToUpdate): Promise<void> {
    this._id = id;
    this._feature = feature;
    return;
  }

  async delete(id: string): Promise<void> {
    if (id !== this._id) {
      throw new Error('ID not found');
    }
  }
}
