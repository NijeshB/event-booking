import { Response } from 'express';

type API_STATUS = 'success' | 'error' | 'failure';
export type API_RESPONSE<T> = {
  res: Response;
  statusCode?: number;
  message?: string;
  statusMessage?: API_STATUS;
  data?: T;
};
