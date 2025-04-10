import { NextFunction, Request, Response } from 'express';
import { jwToken } from '@utils/jwt';
import {
  NotFoundException,
  UnauthorizedException,
} from '@exceptions/customException';
import { userModel } from '@model/UserModel';
import { getSafeUser } from '@utils/helpers';

export const authMiddleware = (role?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers?.authorization;
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer'))
      throw new UnauthorizedException();
    const accessToken = authorization.split(' ')[1];
    const tokenDetails = jwToken.verifyToken(accessToken);
    const users = await userModel.getUsersByUUID(tokenDetails.id);
    if (!users) {
      throw new NotFoundException();
    }
    req.users = getSafeUser(users);
    if (role && role.indexOf(users.role) <= -1)
      throw new UnauthorizedException();
    next();
  };
};
