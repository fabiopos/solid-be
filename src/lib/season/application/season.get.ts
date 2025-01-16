import { SeasonRepository } from '../domain/season.repository';

export class SeasonGet {
  constructor(private repository: SeasonRepository) {}

  async run(teamId: string) {
    return this.repository.getAll(teamId);
  }

  async bySubscription(subscriptionId: string) {
    return this.repository.getAllBySubscription(subscriptionId);
  }

  async findSeason(seasonId: string) {
    return this.repository.find(seasonId);
  }

  async getSeasonTree(teamId: string) {
    const seasons = await this.repository.getSeasonTreeByTeam(teamId);
    const mappedSeasons = seasons.map((x) => {
      return [
        { id: x.id, name: x.name },
        ...x.competitions.map((c) => [
          { id: c.id, name: c.name },
          ...c.matches.map((m) => ({
            id: m.id,
            name:
              m.awayTeam.id === teamId
                ? m.homeTeam.name
                : m.homeTeam.id === teamId
                  ? m.awayTeam.name
                  : '',
          })),
        ]),
      ];
    });

    return mappedSeasons;
  }
}
