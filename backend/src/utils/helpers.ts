import { User } from '@prisma/client';
import { omit } from 'lodash';

import {
  omitUserData,
  SEARCH_USER_LIST,
  USER_PROFILE,
} from '../customTypes/UserType';

//export const isProduction = process.env.NODE_ENV === 'production';
export const isProduction =
  (process.env.NODE_ENV || '').trim().toLowerCase() === 'production';

export const isAdmin = (role: string) => {
  role = role.trim().toLowerCase();
  return role === 'admin';
};

export const getSafeUser = (user: User | null): USER_PROFILE => {
  return user ? omit(user, omitUserData) : null;
};

export const getOrCondition = (search: SEARCH_USER_LIST) => {
  if (!search) {
    return null;
  }

  return Object.entries(search) // Convert object to entries array
    .filter(([_, value]) => value !== undefined && value !== null) // Only include defined values
    .map(([key, value]) => ({ [key]: value })); // Map each key-value pair to its own object
};
