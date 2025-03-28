import { Prisma, User } from '@prisma/client';
import { get, omit } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import prismaClient from '../db/db';
import logger from '@utils/logger';
import {
  createUserSchema,
  typeCreateUser,
  emailSchema,
  typeUserProfile,
  mobileSchema,
} from '@validators/userValidator';
import { asyncHandler } from '@utils/errorHandler';
import { ConflictError, NotFoundException } from '@exceptions/customException';

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prismaClient.user.findMany();
    users.map(getSafeUser);
    res.status(200).json({
      status: 'success',
      data: users,
    });
  },
);

export const getUsersById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!user) {
      throw new NotFoundException('Given UserId is not available');
    }

    res.status(200).json({
      status: 'success',
      data: getSafeUser(user),
    });
  },
);

export const createUsers = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = await createUserSchema.parseAsync(req.body);

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
    data: getSafeUser(user),
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
      data: getSafeUser(user),
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

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!user) {
      throw new NotFoundException('Given UserId is not available');
    }

    await prismaClient.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(204).send();
  },
);

const getSafeUser = (user: User | null) => {
  return user ? omit(user, ['password', 'role']) : null;
};

// const getUserDetails = async (email?: string, mobile?: string) => {
//   if (!email && !mobile) return null; // Handle case where both are undefined
//   const condition = email ? { email } : { mobile };
//   const user = await prismaClient.user.findFirst({ where: condition });

//   return user ? getSafeUser(user) : null;
// };
