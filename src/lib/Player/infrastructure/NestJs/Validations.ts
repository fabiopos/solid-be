import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlayerPayload {
  @ApiProperty({ required: true })
  @IsString()
  @Length(5, 255)
  teamId: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  documentNumber: string;

  @ApiProperty()
  @IsEnum(DocumentType)
  documentType: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  shirtName: string;

  @ApiProperty({ required: true })
  @IsNumber()
  shirtNumber: number;

  @ApiProperty({ required: true })
  @IsEnum(ShirtSize)
  shirtSize: string;

  @ApiProperty({ required: true })
  @IsEnum(DominantFoot)
  dominantFoot: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  favPosition: string;

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
