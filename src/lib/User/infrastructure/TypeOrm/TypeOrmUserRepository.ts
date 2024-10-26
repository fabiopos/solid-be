import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/UserRepository';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/User';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { NotFoundException } from '@nestjs/common';
import { UserUpdateInput } from '../../domain/UserSchema';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly subscriptionRepository: Repository<TypeOrmSubscriptionEntity>,
  ) {}

  async getOneByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: { subscription: true },
    });
    return user ? User.fromPrimitives(user) : null;
  }

  async create(payload: User): Promise<User> {
    const user = User.create(payload);

    const subscription = await this.subscriptionRepository.findOneBy({
      id: user.subscriptionId,
    });

    if (!subscription) throw new NotFoundException('Subscription not found');

    const createdUser = await this.repository.save({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      documentNumber: user.documentNumber,
      documentType: user.documentType,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      active: user.active,
      address: user.address,
      city: user.city,
      country: user.country,
      policy: user.policy,
      subscription: subscription,
    });

    user.id = createdUser.id;

    return user;
  }

  async getAll(): Promise<User[]> {
    return (await this.repository.find()).map((u) => User.fromPrimitives(u));
  }

  async getOneById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? User.fromPrimitives(user) : null;
  }

  async edit(userId: string, input: UserUpdateInput): Promise<void> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });

    user.active = input.active;
    user.address = input.address;
    user.avatarUrl = input.avatarUrl;
    user.city = input.city;
    user.country = input.country;
    user.documentNumber = input.documentNumber;
    user.documentType = input.documentType;
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    user.phone = input.phone;

    await this.repository.save(user);

    return;
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.repository.remove(user);
  }
}
