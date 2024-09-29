import { FeatureT, FeatureToUpdate } from './FeatureSchema';

export interface FeatureRepository {
  create(payload: FeatureT): Promise<FeatureT>;
  getAll(): Promise<FeatureT[]>;
  getOneById(id: string): Promise<FeatureT | null>;
  edit(id: string, feature: FeatureToUpdate): Promise<void>;
  delete(id: string): Promise<void>;
}
