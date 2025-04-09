import prismaClient from '@db/db';

export const userModel = {
  getUsersById: async (uID: number) => {
    return prismaClient.user.findFirst({
      where: {
        id: uID,
      },
    });
  },
};
