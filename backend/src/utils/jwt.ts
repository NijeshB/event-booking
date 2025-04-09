import { UnauthorizedException } from '@exceptions/customException';
import jwt from 'jsonwebtoken';

export const jwToken = {
  verifyToken: (token: string) => {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const tokenDetails = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (!tokenDetails) throw new UnauthorizedException();
    return tokenDetails;
  },
};
