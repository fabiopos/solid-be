import { FieldPositionRepository } from '@/lib/field-position/domain/field-position.repository';
import { PlanRepository } from '@/lib/plan/domain/plan.repository';

export class SettingsGetAll {
  constructor(
    private readonly fieldPositionRepository: FieldPositionRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  async getSettings() {
    const fieldPositions = await this.fieldPositionRepository.getAll();
    const plans = await this.planRepository.getAll();

    return {
      fieldPositions,
      plans,
    };
  }
}
