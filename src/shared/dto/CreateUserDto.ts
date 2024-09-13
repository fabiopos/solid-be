import { DocumentType } from '../enums/playerEnums';

export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: string;
  documentNumber: string;
  documentType: DocumentType;
  active: boolean;
  policy: boolean;
  city: string | undefined;
  avatarUrl: string | undefined;
  country: string | undefined;
  address: string | undefined;
  subscriptionId: string | undefined;
  phone: string | undefined;
}
