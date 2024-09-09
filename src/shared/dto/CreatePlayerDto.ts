import { DocumentType, DominantFoot, ShirtSize } from '../enums/playerEnums';

export interface CreatePlayerDto {
  firstName: string;
  lastName: string;
  documentNumber: string;
  documentType: DocumentType;
  active: boolean;
  avatarUrl: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  teamId: string;
  shirtSize: ShirtSize;
  shirtName: string;
  shirtNumber: number;
  favPositionId: string;
  height: number;
  dominantFoot: DominantFoot;
  eps: string;
  arl: string;
  id?: string | undefined;
}
