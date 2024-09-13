import { Plan } from './Plan';

export interface PlanRepository {
  create(plan: Plan): Promise<Plan>;
  getAll(): Promise<Plan[]>;
  getOneById(id: string): Promise<Plan | null>;
  edit(plan: Plan): Promise<void>;
  delete(id: string): Promise<void>;
}
