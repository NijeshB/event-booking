import { Prisma, User } from '@prisma/client';
import { omit } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import prismaClient from '../db/db';
import logger from '@utils/logger';
import z from 'zod';
import {
  createUserSchema,
  emailSchema,
  typeUserProfile,
} from '@validators/userValidator';
import { asyncHandler } from '@utils/errorHandler';
import { ConflictError, NotFoundException } from 'exceptions/customException';

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await prismaClient.user.findMany();
      res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (e) {
      logger.error('Error in Fetching User List', e);
      res.status(500).json({
        status: 'error',
        message: 'Unable to retrieve data. Please try again later!',
      });
    }
  },
);

export const createUsers = asyncHandler(async (req: Request, res: Response) => {
  createUserSchema.parse(req.body);
  const { email, mobile, name, password } = req.body;
  const mobileString = String(mobile);

  const userEmailExists = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (userEmailExists) {
    throw new ConflictError('EmailId is already exists!');
  }

  const userMobileExists = await prismaClient.user.findFirst({
    where: {
      mobile: mobileString,
    },
  });

  if (userMobileExists) {
    throw new ConflictError('Mobile number already exists!');
  }

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      mobile: mobileString,
      password,
    },
  });

  const safeUser: typeUserProfile = omit(user, ['password']) as typeUserProfile;

  res.status(200).json({
    status: 'success',
    data: {
      user: safeUser,
    },
  });
});

export const getUserByEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    emailSchema.parse(email);

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Given EmailId does not exists!');
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: getSafeUser(user),
      },
    });
  },
);

export const deleteUserByEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    emailSchema.parse(email);

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Given EmailId does not exists!');
    }

    await prismaClient.user.delete({
      where: {
        email,
      },
    });

    res.status(204).send();
  },
);

const getSafeUser = (user: User) => {
  return omit(user, ['password', 'role']);
};

// const getUserDetails = async (email?: string, mobile?: string) => {
//   if (!email && !mobile) return null; // Handle case where both are undefined
//   const condition = email ? { email } : { mobile };
//   const user = await prismaClient.user.findFirst({ where: condition });

//   return user ? getSafeUser(user) : null;
// };
