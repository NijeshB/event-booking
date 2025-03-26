import express from 'express';
import {
  createUsers,
  deleteUserByEmail,
  deleteUserById,
  deleteUserByMobile,
  getUserByEmail,
  getUsers,
  getUsersById,
} from '@controllers/User';
const router = express.Router();

router.get('/', getUsers);
router.get('/:id(\\d+)', getUsersById);
router.get('/byEmail', getUserByEmail);
router.delete('/byEmail', deleteUserByEmail);
router.delete('/byMobile', deleteUserByMobile);
router.delete('/:id(\\d+)', deleteUserById);
router.post('/', createUsers);

export default router;
