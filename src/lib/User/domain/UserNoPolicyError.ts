export class UserNoPolicyError extends Error {
  constructor() {
    super('You must accept the policy');
  }
}
