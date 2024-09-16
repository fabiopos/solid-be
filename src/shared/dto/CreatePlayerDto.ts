import { DocumentType, DominantFoot, ShirtSize } from '../enums/playerEnums';

export interface CreatePlayerDto {
  teamId: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  documentType: DocumentType;
  email: string;
  shirtName: string;
  shirtNumber: number;
  shirtSize: ShirtSize;
  dominantFoot: DominantFoot;
  active: boolean;
  address?: string | undefined;
  city?: string | undefined;
  phone?: string | undefined;
  country?: string | undefined;
  avatarUrl?: string | undefined;
  favPositionId?: string | undefined;
  height?: number | undefined;
  eps?: string | undefined;
  arl?: string | undefined;
  id?: string | undefined;
}
