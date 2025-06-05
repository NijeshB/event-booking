import { Express } from 'express';
import { REQ_USER } from '@types/UserType';

declare global {
  namespace Express {
    export interface Request {
      users: USER | null;
    }
  }
}
