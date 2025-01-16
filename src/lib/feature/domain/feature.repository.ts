import { FeatureT, FeatureToUpdate } from './feature.schema';

export interface FeatureRepository {
  create(payload: FeatureT): Promise<FeatureT>;
  getAll(): Promise<FeatureT[]>;
  getOneById(id: string): Promise<FeatureT | null>;
  edit(id: string, feature: FeatureToUpdate): Promise<void>;
  delete(id: string): Promise<void>;
}
