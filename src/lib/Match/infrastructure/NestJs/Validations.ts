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
