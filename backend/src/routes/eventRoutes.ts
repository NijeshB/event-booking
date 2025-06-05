import express from 'express';
import { eventController } from '@controllers/Event';
import { authMiddleware } from '@middleware/authMiddleware';
import { asyncHandler } from '@utils/errorHandler';

export const eventRoutes = express.Router();
eventRoutes.get(
  '/',
  asyncHandler(authMiddleware(['ADMIN', 'USER'])),
  asyncHandler(eventController.getAllEvents),
);

eventRoutes.post(
  '/create',
  asyncHandler(authMiddleware(['ADMIN'])),
  asyncHandler(eventController.getAllEvents),
);

eventRoutes.get(
  '/update',
  asyncHandler(authMiddleware(['ADMIN'])),
  asyncHandler(eventController.getAllEvents),
);

eventRoutes.get(
  '/delete',
  asyncHandler(authMiddleware(['ADMIN'])),
  asyncHandler(eventController.getAllEvents),
);
