import { User } from '@prisma/client';

export type REQ_USER = Omit<User, 'password'>;
