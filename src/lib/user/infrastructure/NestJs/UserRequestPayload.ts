import { DocumentType } from '@/shared/enums/player.enum';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class NewUserValidatePayload {
  @IsEmail()
  email: string;
}

export interface UpdateUserFindParams {
  id: string;
}

export interface DeleteUserFindParams {
  id: string;
}

export class UpdateUserPayload {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  documentNumber: string;

  @IsOptional()
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsUrl()
  avatarUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  country: string;
}
