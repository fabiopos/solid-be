import { Team } from '@/lib/Team/domain/Team';
import { CreatePlayerDto } from '@/shared/dto/CreatePlayerDto';
import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';

export class Player {
  firstName: string;
  lastName: string;
  documentNumber: string;
  documentType: DocumentType;
  active: boolean;
  email: string;
  teamId: string;
  shirtSize: ShirtSize;
  shirtName: string;
  shirtNumber: number;
  favPositionId: string;
  dominantFoot: DominantFoot;
  address?: string | undefined;
  avatarUrl?: string | undefined;
  phone?: string | undefined;
  city?: string | undefined;
  country?: string;
  height?: number | undefined;
  eps?: string | undefined;
  arl?: string | undefined;
  id?: string | undefined;
  team?: Team;

  static create(dto: CreatePlayerDto) {
    const player = new Player();
    player.firstName = dto.firstName;
    player.lastName = dto.lastName;
    player.email = dto.email;
    player.documentNumber = dto.documentNumber;
    player.documentType = dto.documentType;
    player.shirtNumber = dto.shirtNumber;
    player.shirtName = dto.shirtName;
    player.dominantFoot = dto.dominantFoot;
    player.shirtSize = dto.shirtSize;
    player.teamId = dto.teamId;
    player.address = dto.address;
    player.city = dto.city;
    player.country = dto.country;
    player.teamId = dto.teamId;
    player.active = dto.active;
    player.avatarUrl = dto.avatarUrl;
    player.phone = dto.phone;
    player.favPositionId = dto.favPositionId;
    player.height = dto.height;
    player.eps = dto.eps;
    player.arl = dto.arl;
    player.teamId = dto.teamId;

    return player;
  }
}
