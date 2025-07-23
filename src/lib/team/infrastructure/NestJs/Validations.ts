import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsHexColor,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
} from 'class-validator';

export class TeamSearchParams {
  @IsString()
  name: string;
}
export class CreateTeamPayload {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsOptional()
  active: boolean;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsBoolean()
  @IsOptional()
  hasSubscription: boolean;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsHexColor()
  @IsOptional()
  primaryColor: string | null | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsHexColor()
  @IsOptional()
  secondaryColor: string | null | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsUrl()
  @IsOptional()
  logoUrl: string | null | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsUrl()
  @IsOptional()
  shieldUrl: string | null | undefined;
}

export class ValidateTeamPayload {
  @IsString()
  name: string;
}

export class UpdateTeamParams {
  @IsUUID()
  id: string;
}

export class DeleteTeamParams {
  @IsUUID()
  id: string;
}

export class UpdateTeamPayload {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsHexColor()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsHexColor()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  shieldUrl?: string;
}

export class QueryTeamInvitePayload {
  @IsString()
  sid: string;

  @IsUUID()
  tid: string;
}
