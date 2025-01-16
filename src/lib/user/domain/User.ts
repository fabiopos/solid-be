import { CreateUserDto } from '@/shared/dto/create-user.dto';
import { DocumentType } from '@/shared/enums/player.enum';
import { RoleEnum } from '@/shared/enums/role.enum';

export class User {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: RoleEnum;
  documentNumber: string;
  documentType: DocumentType;
  active: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address?: string;
  city?: string;
  country?: string;
  policy: boolean;
  subscriptionId?: string;
  phone?: string;

  static create(payload: CreateUserDto): User {
    const user = new User();
    user.email = payload.email;
    user.password = payload.password;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.roleId = payload.roleId;
    user.documentNumber = payload.documentNumber;
    user.documentType = payload.documentType;
    user.phone = payload.phone;
    user.avatarUrl = payload.avatarUrl;
    user.active = payload.active;
    user.address = payload.address;
    user.city = payload.city;
    user.country = payload.country;
    user.policy = payload.policy;
    user.subscriptionId = payload.subscriptionId;

    return user;
  }

  static fromPrimitives(data: any): User {
    const user = new User();
    user.id = data.id;
    user.email = data.email;
    user.password = data.password;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.roleId = data.roleId;
    user.documentNumber = data.documentNumber;
    user.documentType = data.documentType;
    user.phone = data.phone;
    user.avatarUrl = data.avatarUrl;
    user.active = data.active;
    user.address = data.address;
    user.city = data.city;
    user.country = data.country;
    user.policy = data.policy;
    user.subscriptionId = data.subscription?.id;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return user;
  }
}
