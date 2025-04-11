import prismaClient from '@db/db';
import { SEARCH_USER, USER_PROFILE } from '@customTypes/UserType';
import { T_CREATE_USER } from '@validators/userValidator';
import { getSafeUser, getOrCondition } from '@utils/helpers';

export const userModel = {
  getAllUsers: async () => {
    return prismaClient.user
      .findMany({
        orderBy: {
          id: 'asc',
        },
      })
      .then(
        (users) => users.map(getSafeUser).filter(Boolean) as USER_PROFILE[],
      );
  },
  searchSingleUser: async (search: SEARCH_USER, useOr: Boolean = false) => {
    if (!search) {
      return null;
    }

    const condition: SEARCH_USER = (
      useOr ? { OR: getOrCondition(search) } : search
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

  addUser: async (data: T_CREATE_USER) => {
    return prismaClient.user
      .create({
        data,
      })
      .then(getSafeUser);
  },
};
