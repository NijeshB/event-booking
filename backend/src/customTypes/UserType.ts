import { User } from '@prisma/client';
// import { getSafeUser } from '@utils/helpers';
import { SearchUserSchema } from '@validators/userValidator';
import { z } from 'zod';

export const omitUserData = ['password', 'id'] as const;
export type SAFEUSER = Omit<User, (typeof omitUserData)[number]>;

export type USER_PROFILE = SAFEUSER | null; //ReturnType<typeof getSafeUser>;

type AtLeastOne<T, Keys extends keyof T = keyof T> = Partial<T> &
  { [K in Keys]: Required<Pick<T, K>> }[Keys];

export type REQ_USER = Omit<User, 'password'>;

export type SEARCH_USER_LIST = z.infer<typeof SearchUserSchema>;

export type SEARCH_USER = AtLeastOne<SEARCH_USER_LIST> & {
  OR?: AtLeastOne<SEARCH_USER_LIST>[];
};
