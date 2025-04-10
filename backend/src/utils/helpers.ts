import { User } from '@prisma/client';
import { SEARCH_USER_LIST } from '../types/UserType';
import { omit } from 'lodash';
//export const isProduction = process.env.NODE_ENV === 'production';
export const isProduction =
  (process.env.NODE_ENV || '').trim().toLowerCase() === 'production';

export const isAdmin = (role: string) => {
  role = role.trim().toLowerCase();
  return role === 'admin';
};

export const getSafeUser = (user: User | null) => {
  return user ? omit(user, ['password']) : null;
};

export const getOrCondition = (search: SEARCH_USER_LIST) => {
  if (!search) {
    return null;
  }

  const orConditions = Object.entries(search) // Convert object to entries array
    .filter(([_, value]) => value !== undefined && value !== null) // Only include defined values
    .map(([key, value]) => ({ [key]: value })); // Map each key-value pair to its own object
};
