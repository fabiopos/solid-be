import {
  TwoFactorSchemaType,
  TwoFactorUpdateSchemaType,
} from './two-factor.schema';

export interface TwoFactorRepository {
  create(payload: TwoFactorSchemaType): Promise<TwoFactorSchemaType>;
  //getAll(): Promise<TwoFactorSchemaType[]>;
  getOneById(id: string): Promise<TwoFactorSchemaType | null>;
  updateStatus(feature: TwoFactorUpdateSchemaType): Promise<void>;
}
