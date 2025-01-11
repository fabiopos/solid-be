import { describe } from 'node:test';

import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import { FulfilledPlayer } from './PlayerSchema';

const validPlayer = {
  active: true,
  address: 'address',
  avatarUrl: 'http://image.image.com',
  shirtSize: ShirtSize.L,
  city: 'city',
  country: 'country',
  documentNumber: 'documentNumber',
  documentType: DocumentType.CC,
  dominantFoot: DominantFoot.RIGHT,
  email: 'email@email.com',
  firstName: 'firstName',
  height: 140,
  lastName: 'lastName',
  phone: 'phone',
  shirtName: 'shirtName',
  shirtNumber: 1,
  arl: 'arl',
  eps: 'eps',
  favPositionId: 'favPositionId',
  teamId: 'teamId',
};

describe('FulfiledPlayer tests', () => {
  it('should be return an Instance of player', () => {
    const createdPlayer = FulfilledPlayer.make(validPlayer);

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
    expect(createdPlayer instanceof FulfilledPlayer).toBe(true);
  });

  it('should throw error if email is wrong', () => {
    const createdPlayer = () =>
      FulfilledPlayer.make({ ...validPlayer, email: 'email' });
    expect(createdPlayer).toThrow();
  });

  it('should throw error if avatarUrl is wrong', () => {
    const createdPlayer = () =>
      FulfilledPlayer.make({ ...validPlayer, avatarUrl: 'avatarUrl' });
    expect(createdPlayer).toThrow();
  });
});
