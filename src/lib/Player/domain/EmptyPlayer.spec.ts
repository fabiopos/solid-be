import { EmptyPlayer } from './PlayerSchema';
import { Arbitrary as A, FastCheck as fc } from '@effect/schema';

describe('EmptyPlayer tests', () => {
  it('should make EmptyPlayer', () => {
    const arb = A.make(EmptyPlayer);
    const emptyPlayers = fc.sample(arb);

    emptyPlayers.map((emptyPlayer) => {
      expect(emptyPlayer).toBeDefined();
    });
  });

  it('should make EmptyPlayer with required fields', () => {
    const arb = A.make(EmptyPlayer);
    const emptyPlayers = fc.sample(arb);

    emptyPlayers.map((emptyPlayer) => {
      expect(emptyPlayer).toBeDefined();
      expect(emptyPlayer.shirtNumber).toBeDefined();
      expect(emptyPlayer.shirtName).toBeDefined();
      expect(emptyPlayer.email).toBeDefined();
      expect(emptyPlayer.documentNumber).toBeDefined();
      expect(emptyPlayer.firstName).toBeDefined();
      expect(emptyPlayer.lastName).toBeDefined();
    });
  });
});
