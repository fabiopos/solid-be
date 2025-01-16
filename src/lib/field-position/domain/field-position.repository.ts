import { FieldPosition } from './field-position';
import { FulfilledFieldPosition } from './field-position.schema';

export interface FieldPositionRepository {
  create(fieldPosition: FieldPosition): Promise<void>;
  getAll(): Promise<FulfilledFieldPosition[]>;
  getOneById(id: string): Promise<FulfilledFieldPosition | null>;
  edit(fieldPosition: FieldPosition): Promise<void>;
  delete(id: string): Promise<void>;
}
