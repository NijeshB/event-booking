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

    // Todo introduce new ID with Value of UUID on user creation lets use that value in other places to avoid JWT tampering
    // https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/10-Testing_JSON_Web_Tokens
    // https://curity.io/resources/learn/jwt-best-practices/

    const users = await userModel.getUsersById(tokenDetails.id);
    if (!users) {
      throw new NotFoundException();
    }
    req.users = getSafeUser(users);
    if (role && role.indexOf(users.role) <= -1)
      throw new UnauthorizedException();
    next();
  };
};
