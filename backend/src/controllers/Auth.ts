import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import prismaClient from '../db/db';
import { User } from '@prisma/client';
import { validatePassword } from '@utils/hash';
import { validateUserLoginSchema } from '@validators/userValidator';
import { asyncHandler } from '@utils/errorHandler';
import {
  UnauthorizedException,
  InternalError,
} from '@exceptions/customException';
import { isAdmin, getSafeUser } from '@utils/helpers';
const JWT_SECRET = process.env.JWT_SECRET as string;
const EXPECTED_ISSUER = process.env.JWT_TOKEN_ISSUER;
console.log('EXPECTED_ISSUER', EXPECTED_ISSUER);

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

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    }; // Store user session

    res.status(200).json({
      status: 'success',
      message: 'Login Successful',
      data: getSafeUser(user),
    });
  },
);

export const adminLogin = asyncHandler(
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

    if (!isAdmin(user.role)) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource!',
      );
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    }; // Store user session

    res.status(200).json({
      status: 'success',
      message: 'Login Successful',
      data: getSafeUser(user),
      token: getAuthToken(user),
    });
  },
);

export const authLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
      throw new UnauthorizedException('No active session found!');
    }

    req.session.destroy((err) => {
      if (err) {
        throw new InternalError('Unable to logout! Please try again later.');
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logout successful' });
    });
  },
);

const getAuthToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role1: user.role,
      iss: EXPECTED_ISSUER,
    },
    JWT_SECRET,
    {
      expiresIn: 5 * 60,
    },
  );
};

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization; // Get 'Authorization' header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized!');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    // Check if the issuer is correct
    if (!decoded.iss || decoded.iss !== EXPECTED_ISSUER) {
      throw new UnauthorizedException('Unauthorized!');
    }

    if (decoded) {
      next();
    }
  } catch (err) {
    throw new UnauthorizedException('Invalid token!');
    //return next(err);
  }
};
/* DUMMY ROUTES TO BE DELETED LATER*/
export const dashboard = (req: Request, res: Response) => {
  if (!req.session.user) {
    throw new UnauthorizedException('No active session found!');
  }

  // Convert UTC to IST
  const convertToIST = (utcDate: Date) => {
    return new Date(
      utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    );
  };

  const expiryTimeUTC = new Date(Date.now() + (req.session.cookie.maxAge || 0));
  const expiryTimeIST = convertToIST(expiryTimeUTC);

  res.json({
    message: `Welcome, ${req.session.user.name}!`,
    userSession: req.session.user,
    expiresIn: req.session.cookie.expires,
    expiresInIST: expiryTimeIST,
  });
};
/* DUMMY ROUTES TO BE DELETED LATER*/
