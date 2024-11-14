import { CompetitionStatusEnum } from '@/shared/enums/competitionStatusEnum';
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
