import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../../domain/Plan';
import { PlanRepository } from '../../domain/PlanRepository';
import { TypeOrmPlanEntity } from './TypeOrmPlanEntity';
import { Repository } from 'typeorm';

export class TypeOrmPlanRepository implements PlanRepository {
  constructor(
    @InjectRepository(TypeOrmPlanEntity)
    private readonly repository: Repository<TypeOrmPlanEntity>,
  ) {}
  async create(payload: Plan): Promise<Plan> {
    return this.repository.save(payload);
  }

  async getAll(): Promise<Plan[]> {
    throw new Error('Method not implemented.');
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
