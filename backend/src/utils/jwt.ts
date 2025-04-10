import { UnauthorizedException } from '@exceptions/customException';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { secrets, TOKEN_EXPIRES_IN } from '../secret';

const JWT_SECRET = secrets.JWT_SECRET;
export const jwToken = {
  verifyToken: (token: string) => {
    const tokenDetails = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (!tokenDetails) throw new UnauthorizedException();
    return tokenDetails;
  },
  getAuthToken: (user: User) => {
    return jwt.sign({ id: user.uuid }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN * 60,
    });
  },
};
