import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../../domain/plan';
import { PlanRepository } from '../../domain/plan.repository';
import { TypeOrmPlanEntity } from './type-orm-plan.entity';

export class TypeOrmPlanRepository implements PlanRepository {
  constructor(
    @InjectRepository(TypeOrmPlanEntity)
    private readonly repository: Repository<TypeOrmPlanEntity>,
  ) {}
  async create(payload: Plan): Promise<Plan> {
    return this.repository.save(payload);
  }

  async getAll(): Promise<Plan[]> {
    return this.repository.find();
  }

  async getOneById(id: string): Promise<Plan | null> {
    return this.repository.findOne({ where: { id } });
  }

  async edit(plan: Plan): Promise<void> {
    throw new Error('Method not implemented.' + plan.id);
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}
