import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import z from 'zod';
import { HttpException } from '@exceptions/customException';

//create a async function to handle async errors in express
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: any) => next(error));
  };
};

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = '';

  if (error instanceof HttpException) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logger.info(`Error::: ${error.code}`);
  } else if (error instanceof z.ZodError) {
    statusCode = 400;
    message = 'Validation Error';
  }

  // logger.info(`Is Zod Error::: ${error instanceof z.ZodError}`);
  // logger.info(`Is Error::: ${error.message}`);
  // // const parentClass = Object.getPrototypeOf(error).constructor.name;
  // console.log(`Instance:: ${error instanceof HttpException}`); // "CustomError"

  res.status(statusCode).json({
    status: 'error',
    message: message,
  });
};
