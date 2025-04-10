import { User } from '@prisma/client';
import { SearchUserSchema } from '@validators/userValidator';
import { z } from 'zod';

type AtLeastOne<T, Keys extends keyof T = keyof T> = Partial<T> &
  { [K in Keys]: Required<Pick<T, K>> }[Keys];

export type REQ_USER = Omit<User, 'password'>;

export type SEARCH_USER_LIST = z.infer<typeof SearchUserSchema>;

export type SEARCH_USER = AtLeastOne<SEARCH_USER_LIST> & {
  OR?: AtLeastOne<SEARCH_USER_LIST>[];
};
