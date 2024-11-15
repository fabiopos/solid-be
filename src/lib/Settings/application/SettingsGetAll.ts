import { FieldPositionRepository } from '@/lib/FieldPosition/domain/FieldPositionRepository';
import { PlanRepository } from '@/lib/Plan/domain/PlanRepository';

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
