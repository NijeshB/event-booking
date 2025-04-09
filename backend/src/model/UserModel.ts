import prismaClient from '@db/db';

export const userModel = {
  getUsersById: async (uID: number) => {
    return prismaClient.user.findUnique({
      where: {
        id: uID,
      },
    });
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
};
