import { DocumentType } from '@/shared/enums/playerEnums';
import { RoleEnum } from '@/shared/enums/roleEnum';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserPayload {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;

  @IsString()
  @Length(3, 50)
  firstName: string;

  @IsString()
  @Length(3, 50)
  lastName: string;

  @IsEnum(RoleEnum)
  roleId: RoleEnum;

  @IsString()
  @Length(5, 50)
  documentNumber: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsBoolean()
  policy: boolean;

  @IsOptional()
  city: string | undefined;

  @IsUrl()
  @IsOptional()
  avatarUrl: string | undefined;

  @IsString()
  @IsOptional()
  country: string | undefined;

  @IsString()
  @IsOptional()
  address: string | undefined;

  @IsString()
  @IsUUID()
  subscriptionId: string | undefined;

  @IsString()
  @IsOptional()
  phone: string | undefined;
}
