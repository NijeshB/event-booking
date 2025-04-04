//export const isProduction = process.env.NODE_ENV === 'production';
export const isProduction =
  (process.env.NODE_ENV || '').trim().toLowerCase() === 'production';

export const isAdmin = (role: string) => {
  role = role.trim().toLowerCase();
  return role === 'admin';
};
