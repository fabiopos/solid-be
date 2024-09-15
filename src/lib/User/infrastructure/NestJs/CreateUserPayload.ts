import { DocumentType } from '@/shared/enums/playerEnums';
import { RoleEnum } from '@/shared/enums/roleEnum';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  lastName: string;

  @ApiProperty({ type: 'enum', nullable: true })
  @IsEnum(RoleEnum)
  roleId: RoleEnum;

  @ApiProperty()
  @IsString()
  @Length(5, 50)
  documentNumber: string;

  @ApiProperty()
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @ApiProperty()
  @IsBoolean()
  policy: boolean;

  @ApiProperty({ required: false, type: 'boolean', nullable: true })
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsOptional()
  city: string | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsUrl()
  @IsOptional()
  avatarUrl: string | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsOptional()
  country: string | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsOptional()
  address: string | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsOptional()
  @IsString()
  @IsUUID()
  subscriptionId: string | undefined;

  @ApiProperty({ required: false, type: 'string', nullable: true })
  @IsString()
  @IsOptional()
  phone: string | undefined;
}
