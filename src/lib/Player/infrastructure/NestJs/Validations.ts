import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class Create {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  documentNumber: string;

  @IsEnum(DocumentType)
  documentType: string;

  active: boolean;

  @IsString()
  @IsOptional()
  favPosition: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  shirtName: string;

  @IsNumber()
  shirtNumber: number;

  @IsEnum(ShirtSize)
  shirtSize: string;

  @IsEnum(DominantFoot)
  dominantFoot: string;

  @IsDate()
  @IsOptional()
  bornDate: Date;

  @IsDate()
  @IsOptional()
  endSubscriptionDate: Date;

  @IsNumber()
  @IsOptional()
  height: number;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsString()
  @IsOptional()
  arl: string;

  @IsString()
  @IsOptional()
  eps: string;

  @IsString()
  @Length(5, 255)
  teamId: string;
}
