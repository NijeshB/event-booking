import { Request, Response } from "express";
import prisma from "../db/db";
import logger from "@utils/logger";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
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
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { email, mobile, name, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        mobile: mobile,
        password: password,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (e) {
    logger.error("Error in creating User List", e);
    res.status(500).json({
      status: "error",
      message: "Unable to create user. Please try again later!",
    });
  }
};
