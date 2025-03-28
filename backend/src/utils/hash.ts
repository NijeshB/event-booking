import bcrypt from 'bcrypt';

const saltRounds = 10;
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const validatePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
