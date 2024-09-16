import { FieldPosition } from './FieldPosition';

export interface FieldPositionRepository {
  create(fieldPosition: FieldPosition): Promise<void>;
  getAll(): Promise<FieldPosition[]>;
  getOneById(id: string): Promise<FieldPosition | null>;
  edit(fieldPosition: FieldPosition): Promise<void>;
  delete(id: string): Promise<void>;
}
