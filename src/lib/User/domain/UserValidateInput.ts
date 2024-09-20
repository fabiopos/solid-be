import { DocumentType } from '@/shared/enums/playerEnums';

export class UserValidateInput {
  email: string;
  documentNumber?: string | undefined;
  documentType?: DocumentType | undefined;
}
