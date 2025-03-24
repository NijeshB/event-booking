import { Prisma, User } from '@prisma/client';
import { omit } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import prismaClient from '../db/db';
import logger from './../utils/logger';
import {
  createUserSchema,
  typeCreateUser,
  emailSchema,
  typeUserProfile,
  mobileSchema,
} from './../validators/userValidator';
import { asyncHandler } from './../utils/errorHandler';
import {
  ConflictError,
  NotFoundException,
} from './../exceptions/customException';

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Inside Users:::');
    const users = await prismaClient.user.findMany();
    logger.info('Users:::', users);

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  },
);

export const createUsers = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createUserSchema.parse(req.body);

  const { email, mobile } = validatedData;

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
      mobile,
    },
  });

  if (userMobileExists) {
    throw new ConflictError('Mobile number already exists!');
  }

  const user = await prismaClient.user.create({
    data: validatedData,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: getSafeUser(user),
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

export const deleteUserByMobile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobile } = mobileSchema.parse(req.body);
    const user = await prismaClient.user.findFirst({
      where: {
        mobile,
      },
    });

    if (!user) {
      throw new NotFoundException('Given Mobile Number does not exists!');
    }

    await prismaClient.user.delete({
      where: {
        mobile,
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
