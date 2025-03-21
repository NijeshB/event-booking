import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import logger from "./logger";
import z from "zod";
import { log } from "console";

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
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logger.info(`Error::: ${error.code}`);
  }

  logger.info(`Is Zod Error::: ${error instanceof z.ZodError}`);
  // res.status(500).json({
  //   status: "error",
  //   message: "Unable to create user. Please try again later!",
  // });
  res.status(statusCode).json({
    status: "error",
    message: error,
    error: error,
  });
};
