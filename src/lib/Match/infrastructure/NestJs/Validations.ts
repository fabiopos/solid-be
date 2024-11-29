import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class MatchIdParams {
  @IsUUID()
  matchId: string;
}

export class MatchCompetitionIdParams {
  @IsUUID()
  competitionId: string;
}
export class MatchSeasonIdParams {
  @IsUUID()
  seasonId: string;
}

export class MatchCreatePayload {
  @IsString()
  title: string;

  @IsUUID()
  homeTeamId: string;

  @IsUUID()
  awayTeamId: string;

  @IsUUID()
  competitionId: string;

  @IsDateString()
  matchDay: string;

  @IsDateString()
  matchHour: string;

  @IsBoolean()
  @IsOptional()
  wo: boolean;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsString()
  location: string;
}

export class MatchUpdatePayload {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsUUID()
  homeTeamId: string;

  @IsOptional()
  @IsUUID()
  awayTeamId: string;

  @IsOptional()
  @IsUUID()
  competitionId: string;

  @IsOptional()
  @IsDateString()
  matchDay: string;

  @IsOptional()
  @IsDateString()
  matchHour: string;

  @IsBoolean()
  @IsOptional()
  wo: boolean;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsOptional()
  @IsString()
  location: string;
}
