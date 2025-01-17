import { DocumentType } from '../../../shared/enums/player.enum';

export class UserValidateInput {
  email: string;
  documentNumber?: string | undefined;
  documentType?: DocumentType | undefined;
}
