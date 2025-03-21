import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import prismaClient from "../db/db";
import logger from "@utils/logger";
import { createUserSchema } from "@validators/userValidator";
import { asyncHandler } from "@utils/errorHandler";

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await prismaClient.user.findMany();
      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    } catch (e) {
      logger.error("Error in Fetching User List", e);
      res.status(500).json({
        status: "error",
        message: "Unable to retrieve data. Please try again later!",
      });
    }
  }
);

export const createUsers = asyncHandler(async (req: Request, res: Response) => {
  createUserSchema.parse(req.body);
  const { email, mobile, name, password } = req.body;
  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      mobile,
      password,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
