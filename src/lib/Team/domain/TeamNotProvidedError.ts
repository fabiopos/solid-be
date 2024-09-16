export class TeamNotProvidedError extends Error {
  constructor() {
    super('You must provide at least one team');
  }
}
