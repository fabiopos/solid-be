import { FieldPositionRepository } from '../../domain/FieldPositionRepository';

export class FieldPositionGetAll {
  constructor(private repository: FieldPositionRepository) {}
  async run() {
    return this.repository.getAll();
  }
}
