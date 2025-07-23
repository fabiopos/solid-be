import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmTwoFactorEntity } from './twofactor.entity';
import { Repository } from 'typeorm';
import { TwoFactorRepository } from '../../domain/two-factor-repository';
import {
  TwoFactorSchemaType,
  TwoFactorUpdateSchemaType,
  twoFactorSchema,
} from '../../domain/two-factor.schema';

export class TypeOrmTwoFactorRepository implements TwoFactorRepository {
  constructor(
    @InjectRepository(TypeOrmTwoFactorEntity)
    private readonly repository: Repository<TypeOrmTwoFactorEntity>,
  ) {}

  create({
    teamId,
    ...rest
  }: TwoFactorSchemaType): Promise<TwoFactorSchemaType> {
    return this.repository.save({
      ...rest,
      teamId,
      team: { id: teamId },
    });
  }
  async getOneById(id: string): Promise<TwoFactorSchemaType | null> {
    const result = await this.repository.findOne({
      where: { id },
      relations: ['team'],
    });
    return twoFactorSchema.make({
      id: result.id,
      status: result.status,
      phone: result.phone,
      teamId: result.team.id,
      email: result.email,
    }) as TwoFactorSchemaType;
  }
  updateStatus(feature: TwoFactorUpdateSchemaType): Promise<void> {
    this.repository.update(feature.id, {
      status: feature.status,
    });
    return;
  }
}
