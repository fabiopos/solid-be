import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsHexColor,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

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
