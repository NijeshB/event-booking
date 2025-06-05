import { Response } from 'express';
import { API_RESPONSE } from '@customTypes/api';

export const sendSuccess = <T>({
  res,
  data,
  statusCode = 200,
  statusMessage = 'success',
  message = '',
}: API_RESPONSE<T>) => {
  return res.status(statusCode).json({ status: statusMessage, data, message });
};

export const sendFailure = (
  res: Response,
  error: Error,
  status: number,
  message: string,
) => {
  return res.status(status).json({ status: message, error: error.message });
};

export const send204 = (res: Response) => {
  return res.status(204).send();
};
