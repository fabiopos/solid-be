import { PlanRepository } from '../lib/plan/domain/plan.repository';
import { Plan } from '../lib/plan/domain/plan';

export class PlanRepositoryMock implements PlanRepository {
  private _id: string;
  private _plan: Plan;

  async getAll(): Promise<Plan[]> {
    return [];
  }

  async getOneById(id: string): Promise<Plan | null> {
    this._id = id;
    return null;
  }

  async create(plan: Plan): Promise<Plan> {
    return plan;
  }

  async edit(plan: Plan): Promise<void> {
    this._plan = plan;
    return;
  }

  async delete(id: string): Promise<void> {
    this._id = id;
    return;
  }
}
