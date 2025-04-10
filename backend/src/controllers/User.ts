import { Request, Response, NextFunction } from 'express';
import prismaClient from '@db/db';
import {
  createUserSchema,
  emailSchema,
  mobileSchema,
  SearchUserSchema,
} from '@validators/userValidator';
import { asyncHandler } from '@utils/errorHandler';
import { ConflictError, NotFoundException } from '@exceptions/customException';
import { getSafeUser } from '@utils/helpers';
import { userModel } from '@model/UserModel';
import { SEARCH_USER } from '../types/UserType';

export const findSingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const search = { ...req.params, ...req.body };
    const validatedData: SEARCH_USER = SearchUserSchema.parse(
      search,
    ) as SEARCH_USER;

    const user = await userModel.searchSingleUser(validatedData, true);

    if (!user) {
      throw new NotFoundException(
        'User details not available for the given details',
      );
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  },
);
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  },
);

export const createUsers = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = await createUserSchema.parseAsync(req.body);

  const { email, mobile } = validatedData;
  const search: SEARCH_USER = { email, mobile } as SEARCH_USER;

  const userExists = await userModel.searchSingleUser(search, true);

  if (userExists) {
    // Check if the user already exists based on email or mobile
    if (userExists.email === email) {
      throw new ConflictError('Given EmailId is already exists!');
    }
    if (userExists.mobile === mobile) {
      throw new ConflictError('Given Mobile number is already exists!');
    }
  }

  const user = await userModel.addUser(validatedData);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

export const deleteUserByEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    emailSchema.parse(email);

    const user = await userModel.searchSingleUser({ email });

    if (!user) {
      throw new NotFoundException('Given EmailId is not exists!');
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

    const user = await userModel.searchSingleUser({ mobile });

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
    const id = Number(req.params.id);

    const user = await userModel.searchSingleUser({ id });

    if (!user) {
      throw new NotFoundException('Given UserId is not available');
    }

    await prismaClient.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ id }); // React Admin expects { id: deletedId }
    // res.status(204).send();
  },
);

export const updateUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const reqData = req.body;
    reqData.role = reqData.role.toUpperCase();

    const user = await userModel.searchSingleUser({ id: +id });

    if (!user) {
      throw new NotFoundException('Given UserId is not available');
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: +id,
      },
      data: {
        ...reqData,
      },
    });

    res.status(200).json({
      status: 'success',
      data: getSafeUser(updatedUser),
    });
  },
);

// @todo - To be deleted later
/*
export const getUsersById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findUsersById(Number(req.params.id));

    if (!user) {
      throw new NotFoundException('Given UserId is not available');
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  },
);

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

*/
// @todo - To be deleted later
