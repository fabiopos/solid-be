import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class MatchAparitionGetByMatchIdParams {
  @IsUUID()
  matchId: string;
}

export class MatchAparitionUpdateParams {
  @IsUUID()
  matchAparitionId: string;
}

export class MatchAparitionDeleteParams {
  @IsUUID()
  matchAparitionId: string;
}

export class MatchAparitionCreatePayload {
  @IsOptional()
  @IsNumber()
  minutes: number;

  @IsOptional()
  @IsNumber()
  goals: number;

  @IsOptional()
  @IsNumber()
  assists: number;

  @IsOptional()
  @IsNumber()
  yellowCards: number;

  @IsOptional()
  @IsNumber()
  redCards: number;

  @IsOptional()
  @IsBoolean()
  injury: boolean;

  @IsOptional()
  @IsBoolean()
  manOfTheMatch: boolean;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsBoolean()
  played: boolean;

  @IsOptional()
  @IsBoolean()
  confirmed: boolean;

  @IsUUID()
  playerId: string;

  @IsUUID()
  matchId: string;
}

export class MatchAparitionUpdatePayload {
  @IsOptional()
  @IsNumber()
  yellowCards: number;

  @IsOptional()
  @IsNumber()
  redCards: number;

  @IsOptional()
  @IsBoolean()
  injury: boolean;

  @IsOptional()
  @IsBoolean()
  manOfTheMatch: boolean;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsBoolean()
  played: boolean;

  @IsOptional()
  @IsBoolean()
  confirmed: boolean;
}
