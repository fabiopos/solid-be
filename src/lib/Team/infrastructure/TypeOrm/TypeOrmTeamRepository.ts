import { Repository } from 'typeorm';
import { TypeOrmTeamEntity } from './TypeOrmTeamEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../../domain/Team';
import { TeamRepository } from '../../domain/TeamRepository';

export class TypeOrmTeamRepository implements TeamRepository {
  constructor(
    @InjectRepository(TypeOrmTeamEntity)
    private readonly repository: Repository<TypeOrmTeamEntity>,
  ) {}

  private mapToDomain(u: TypeOrmTeamEntity) {
    return Team.create({
      active: u.active,
      name: u.name,
      primaryColor: u.primaryColor,
      secondaryColor: u.secondaryColor,
      logoUrl: u.logoUrl,
      shieldUrl: u.shieldUrl,
      hasSubscription: u.hasSubscription,
    });
  }

  async getAll(): Promise<Team[]> {
    const teams = await this.repository.find();
    return teams.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: string): Promise<Team | null> {
    const team = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!team) return null;

    return this.mapToDomain(team);
  }

  async create(team: Team): Promise<Team> {
    const result = await this.repository.save({
      name: team.name,
      active: team.active,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      shieldUrl: team.shieldUrl,
      hasSubscription: team.hasSubscription,
    });
    const createdTeam = Team.create(result);
    createdTeam.id = result.id;

    return createdTeam;
  }

  async edit(team: Team): Promise<void> {
    await this.repository.update(team.id, {
      name: team.name,
      active: team.active,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      shieldUrl: team.shieldUrl,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
