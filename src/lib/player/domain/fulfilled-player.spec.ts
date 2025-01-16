import { describe } from 'node:test';

import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/player.enum';
import { FulfilledPlayer } from './player.schema';
import { Arbitrary, FastCheck } from '@effect/schema';

// export const playerSchema = S.Struct({
//   id: S.optional(S.String),
//   teamId: S.optional(S.String),
//   // createdAt: S.optional(S.Union(S.String, S.Date, S.Null)),
//   // bornDate: S.optional(S.NullOr(S.Date)),
//   // firstName: S.optional(S.String),
//   // lastName: S.optional(S.String),
//   // documentNumber: S.optional(S.String),
//   // documentType: S.Enums(DocumentType),
//   active: S.optional(S.Boolean),
//   // status: S.optional(S.Enums(PlayerStatus)),
//   email: S.String.pipe(
//     S.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
//   ).annotations({
//     arbitrary: () => (fc) =>
//       fc.constant(null).map(() => faker.internet.email()),
//   }),

//   //shirtSize: S.optional(S.Enums(ShirtSize)),
//   shirtName: S.optional(S.String),
//   // shirtNumber: S.optional(
//   //   S.Int.pipe(
//   //     S.between(1, 99, { message: () => `Shirt number should be between` }),
//   //   ),
//   // ),
//   // dominantFoot: S.optional(
//   //   S.Enums(DominantFoot).annotations({
//   //     arbitrary: () => (fc) =>
//   //       fc.constantFrom(
//   //         DominantFoot.BOTH,
//   //         DominantFoot.LEFT,
//   //         DominantFoot.RIGHT,
//   //       ),
//   //   }),
//   // ),
//   // team: S.optional(teamSchema),
//   //favPositionId: S.optional(S.NullOr(S.String)),
//   // favPosition: S.optional(
//   //   S.NullishOr(
//   //     S.Struct({
//   //       id: S.optional(S.String),
//   //       name: S.optional(S.NullOr(S.String)),
//   //       // category: S.optional(S.Enums(FieldPositionCategoryEnum)),
//   //       // order: S.optional(S.NullOr(S.Number)),
//   //       //fieldPosition: S.optional(fieldPositionSchema),
//   //     }),
//   //   ),
//   // ),
//   // address: S.optional(S.NullishOr(S.String)),
//   // avatarUrl: S.optional(
//   //   S.NullishOr(
//   //     S.String.pipe(
//   //       S.pattern(urlRegex, { message: () => 'Avatar url is invalid' }),
//   //     ),
//   //   ),
//   // ),
//   phone: S.optional(S.NullishOr(S.String)),
//   city: S.optional(S.NullishOr(S.String)),
//   country: S.optional(S.NullishOr(S.String)),
//   eps: S.optional(S.NullishOr(S.String)),
//   arl: S.optional(S.NullishOr(S.String)),
//   // weight: S.optional(
//   //   S.NullishOr(
//   //     S.Int.pipe(
//   //       S.between(35, 200, {
//   //         message: () => `Not supported weight to create a player`,
//   //       }),
//   //     ),
//   //   ),
//   // ),
//   // height: S.optional(
//   //   S.NullishOr(
//   //     S.Int.pipe(
//   //       S.between(140, 210, {
//   //         message: () => `Not supported height to create a player`,
//   //       }),
//   //     ).annotations({
//   //       arbitrary: () => (fc) => fc.constantFrom(140, 150, 160),
//   //     }),
//   //   ),
//   // ),
//   // playerPositions: S.optional(
//   //   S.Array(
//   //     S.Struct({
//   //       id: S.optional(S.String),
//   //       // category: S.optional(S.Enums(FieldPositionCategoryEnum)),
//   //       // fieldPosition: S.optional(fieldPositionSchema),
//   //     }),
//   //   ),
//   // ),
//   // team: S.optional(teamStruct),
//   // matchAparitions: S.optional(
//   //   S.Array(
//   //     S.Struct({
//   //       id: S.optional(S.NullishOr(S.String)),
//   //       minutes: S.optional(S.NullishOr(S.Int)),
//   //       goals: S.optional(S.NullishOr(S.Int)),
//   //       assists: S.optional(S.NullishOr(S.Int)),
//   //       yellowCards: S.optional(S.NullishOr(S.Int)),
//   //       redCards: S.optional(S.NullishOr(S.Int)),
//   //       injury: S.optional(S.NullishOr(S.Boolean)),
//   //       manOfTheMatch: S.optional(S.NullishOr(S.Boolean)),
//   //       rating: S.optional(S.NullishOr(S.Int)),
//   //       played: S.optional(S.NullishOr(S.Boolean)),
//   //       confirmed: S.optional(S.NullishOr(S.Boolean)),
//   //       match: S.optional(
//   //         S.Struct({
//   //           id: S.optional(S.String),
//   //           homeTeamId: S.optional(S.String),
//   //           awayTeamId: S.optional(S.String),
//   //           competitionId: S.optional(S.String),
//   //           createdAt: S.optional(S.Date),
//   //           title: S.optional(S.String),
//   //           // homeTeam: S.optional(S.NullishOr(teamStruct)),
//   //           // awayTeam: S.optional(S.NullishOr(teamStruct)),
//   //           awayScore: S.optional(S.NullishOr(S.Int)),
//   //           homeScore: S.optional(S.NullishOr(S.Int)),
//   //           matchDay: S.optional(S.NullishOr(S.Date)),
//   //           matchHour: S.optional(S.NullishOr(S.Date)),
//   //           wo: S.optional(S.Boolean),
//   //           location: S.optional(S.NullishOr(S.String)),
//   //           completed: S.optional(S.Boolean),
//   //           // competition: S.optional(competitionStruct),
//   //         }),
//   //       ),
//   //     }),
//   //   ),
//   // ),
// });

const validPlayer = {
  active: true,
  address: 'address',
  avatarUrl:
    'https://tvefqfrpvwacsfdyfked.supabase.co/storage/v1/object/public/assets/avatar_659d12b4-d991-44f5-9b8d-ade604f13dbb.jpg',
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

  it('should make a FulfiledPlayer', () => {
    const arb = Arbitrary.make(FulfilledPlayer);
    const players = FastCheck.sample(arb);

    players.map((player) => {
      expect(player).toBeDefined();
    });
  });
});
