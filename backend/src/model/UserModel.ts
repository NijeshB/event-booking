import prismaClient from '@db/db';
import { User } from '@prisma/client';
import { omit } from 'lodash';
import { getSafeUser, getOrCondition } from '@utils/helpers';
import { typeCreateUser } from '@validators/userValidator';
import { SEARCH_USER } from '../types/UserType';
import { object } from 'zod';
export const userModel = {
  getAllUsers: async () => {
    return prismaClient.user
      .findMany({
        orderBy: {
          id: 'asc',
        },
      })
      .then((users) => users.map(getSafeUser));
  },
  searchSingleUser: async (search: SEARCH_USER, useOr: Boolean = false) => {
    if (!search) {
      return null;
    }

    const condition: SEARCH_USER = (
      useOr ? { or: getOrCondition(search) } : search
    ) as SEARCH_USER;
    return await prismaClient.user
      .findFirst({ where: condition })
      .then(getSafeUser);
  },
  findUsersById: async (id: number) => {
    return prismaClient.user
      .findUnique({
        where: {
          id,
        },
      })
      .then(getSafeUser);
  },
  getUsersByUUID: async (uuid: string) => {
    return prismaClient.user.findUnique({
      where: {
        uuid,
      },
    });
  },
  findUsers: async (email: string) => {
    return prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  },
  getUsersList: async () => {
    return prismaClient.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  },

  addUser: async (data: typeCreateUser) => {
    return prismaClient.user
      .create({
        data,
      })
      .then(getSafeUser);
  },
};
