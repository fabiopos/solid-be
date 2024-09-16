import { describe } from 'node:test';
import { Player } from './Player';
import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';

describe('Player', () => {
  it('should be return an Instance of player', () => {
    const createdPlayer = Player.create({
      active: true,
      address: 'address',
      avatarUrl: 'avatarUrl',
      shirtSize: ShirtSize.L,
      city: 'city',
      country: 'country',
      documentNumber: 'documentNumber',
      documentType: DocumentType.CC,
      dominantFoot: DominantFoot.RIGHT,
      email: 'email',
      firstName: 'firstName',
      height: 1,
      lastName: 'lastName',
      phone: 'phone',
      shirtName: 'shirtName',
      shirtNumber: 1,
      arl: 'arl',
      eps: 'eps',
      favPositionId: 'favPositionId',
      teamId: 'teamId',
    });

    expect(createdPlayer.firstName).toBeTruthy();
    expect(createdPlayer.lastName).toBeTruthy();
    expect(createdPlayer.documentNumber).toBeTruthy();
    expect(createdPlayer.documentType).toBeTruthy();
    expect(createdPlayer.email).toBeTruthy();
    expect(createdPlayer.shirtName).toBeTruthy();
    expect(createdPlayer.shirtNumber).toBeTruthy();
    expect(createdPlayer.shirtSize).toBeTruthy();
    expect(createdPlayer.dominantFoot).toBeTruthy();
    expect(createdPlayer.active).toBe(true);
    expect(createdPlayer instanceof Player).toBe(true);
  });
});
