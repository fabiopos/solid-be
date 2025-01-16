import { FieldPositionRepository } from '../../domain/field-position.repository';

export class FieldPositionGetAll {
  constructor(private repository: FieldPositionRepository) {}
  async run() {
    return this.repository.getAll();
  }
}
