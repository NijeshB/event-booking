import { Request, Response, NextFunction } from 'express';

export const eventController = {
  getAllEvents: async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'will see events later after dealing with token ',
    });
  },
};
