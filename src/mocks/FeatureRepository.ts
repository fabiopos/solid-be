import { FeatureRepository } from '@/lib/feature/domain/feature.repository';

export class FeatureRepositoryMock implements FeatureRepository {
  async getAll() {
    return [];
  }
  async getOneById(id: string) {
    return null;
  }
  async create(payload: any) {
    return payload;
  }
  async edit(payload: any) {
    return;
  }
  async delete(id: string) {
    return;
  }
}