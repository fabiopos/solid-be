export const JWT_SECRET = 'SOLID-MANAGER-JWT-SECRET_2024';

export const JWT_OPTIONS = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '48h' },
};
