import { Request, Response, NextFunction } from 'express';
import prismaClient from '../db/db';
import { validatePassword } from '@utils/hash';
import { validateUserLoginSchema } from '@validators/userValidator';
import { asyncHandler } from '@utils/errorHandler';
import { UnauthorizedException } from '@exceptions/customException';
import { getSafeUser } from '@controllers/User';

export const authLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authLogin = validateUserLoginSchema.parse(req.body);

    const user = await prismaClient.user.findFirst({
      where: {
        email: authLogin.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password!');
    }

    if (!(await validatePassword(authLogin.password, user.password))) {
      throw new UnauthorizedException('Invalid Email or Password!');
    }

    res.status(200).json({
      status: 'success',
      message: 'Login Successful',
      data: getSafeUser(user),
    });
  },
);

export const authLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);
