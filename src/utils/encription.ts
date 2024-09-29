import { compareSync, hash } from 'bcrypt';

const HASH_SALT = 10;
export function encryptPassword(password: string) {
  return hash(password, HASH_SALT);
}

export function comparePassword(dbPassword: string, userPasssword: string) {
  return compareSync(userPasssword, dbPassword);
}
