import { FieldPosition } from './FieldPosition';
import { FulfilledFieldPosition } from './FieldPositionSchema';

export interface FieldPositionRepository {
  create(fieldPosition: FieldPosition): Promise<void>;
  getAll(): Promise<FulfilledFieldPosition[]>;
  getOneById(id: string): Promise<FulfilledFieldPosition | null>;
  edit(fieldPosition: FieldPosition): Promise<void>;
  delete(id: string): Promise<void>;
}
