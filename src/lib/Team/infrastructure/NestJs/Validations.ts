import {
  IsBoolean,
  IsHexColor,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateTeamPayload {
  @IsString()
  @Length(3, 50)
  name: string;

  active: boolean;

  @IsBoolean()
  @IsOptional()
  hasSubscription: boolean;

  @IsString()
  @IsHexColor()
  @IsOptional()
  primaryColor: string | null | undefined;

  @IsString()
  @IsHexColor()
  @IsOptional()
  secondaryColor: string | null | undefined;

  @IsString()
  @IsUrl()
  @IsOptional()
  logoUrl: string | null | undefined;

  @IsString()
  @IsUrl()
  @IsOptional()
  shieldUrl: string | null | undefined;
}
