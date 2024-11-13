import { IsDateString, IsString, IsUUID } from 'class-validator';

export class SeasonParams {
  @IsUUID('all', { each: true })
  id: string;
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
