import { PlanRepository } from '@/lib/plan/domain/PlanRepository';

export class PlanRepositoryMock implements PlanRepository {
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
