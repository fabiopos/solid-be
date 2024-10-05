import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
export class PlayerGetAllParams {
  @IsUUID()
  teamId: string;
}

export class PlayerFindParams {
  @IsUUID()
  id: string;
}
export class CreatePlayerPayload {
  @ApiProperty({ required: true })
  @IsUUID()
  teamId: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsArray()
  fieldPositions: string[];

  @ApiProperty()
  @IsString()
  documentNumber: string;

  @ApiProperty()
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(3, 15)
  shirtName: string;

  @ApiProperty({ required: true })
  @IsNumber()
  shirtNumber: number;

  @ApiProperty({ required: true })
  @IsEnum(ShirtSize)
  shirtSize: ShirtSize;

  @ApiProperty({ required: true })
  @IsEnum(DominantFoot)
  dominantFoot: DominantFoot;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatarUrl: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  bornDate: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  endSubscriptionDate: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  height: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  arl: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  eps: string;
}

export class UpdatePlayerPayload {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  @Length(3, 15)
  shirtName: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  shirtNumber: number;

  @ApiProperty({ required: true })
  @IsEnum(ShirtSize)
  @IsOptional()
  shirtSize: ShirtSize;

  @ApiProperty({ required: true })
  @IsEnum(DominantFoot)
  @IsOptional()
  dominantFoot: DominantFoot;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatarUrl: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  bornDate: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  endSubscriptionDate: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  height: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  arl: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  eps: string;

  // @ApiProperty()
  // @IsArray()
  // fieldPositions: string[];
}
