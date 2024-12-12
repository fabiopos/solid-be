import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class SeasonParams {
  @IsUUID('all', { each: true })
  id: string;
}

export class SeasonTreeByTeamParams {
  @IsUUID('all', { each: true })
  id: string;
}

export class SeasonUpdateParams {
  @IsUUID('all', { each: true })
  seasonId: string;
}

export class SeasonDeleteParams {
  @IsUUID('all', { each: true })
  seasonId: string;
}

export class SeasonCreatePayload {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  description: string;
}

export class SeasonUpdatePayload {
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
  @IsString()
  description: string;
}
