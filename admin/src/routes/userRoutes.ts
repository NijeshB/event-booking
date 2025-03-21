import express from 'express';
import {
  createUsers,
  deleteUserByEmail,
  getUserByEmail,
  getUsers,
} from '../controllers/User';
import { asyncHandler } from '../utils/errorHandler';
const router = express.Router();

router.get('/', getUsers);
router.get('/byEmail', getUserByEmail);
router.delete('/byEmail', deleteUserByEmail);
router.post('/', createUsers);

export default router;
