import { CompetitionStatusEnum } from '@/shared/enums/competition-status.enum';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CompetitionCreatePayload {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(CompetitionStatusEnum)
  status: CompetitionStatusEnum;

  @IsOptional()
  @IsString()
  description: string;
}

export class CompetitionUpdatePayload {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsEnum(CompetitionStatusEnum)
  status: CompetitionStatusEnum;

  @IsOptional()
  @IsString()
  description: string;
}

export class CompetitionByIdParams {
  @IsUUID()
  competitionId: string;
}

export class CompetitionBySeasonParams {
  @IsUUID()
  seasonId: string;
}

export class CompetitionByTeamParams {
  @IsUUID()
  teamId: string;
}
