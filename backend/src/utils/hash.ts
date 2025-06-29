import bcrypt from 'bcrypt';

const saltRounds = 10;
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const validatePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateRandomPassword = (length: number = 10): string => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length - 2; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  let specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  password += Math.floor(Math.random() * 10); // Add a random digit
  password += specialChars[Math.floor(Math.random() * specialChars.length)]; // Add another random digit
  return shuffleString(password);
};

export const shuffleString = (str: string) => {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};
