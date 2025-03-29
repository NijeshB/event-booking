import express from 'express';
import {
  createUsers,
  updateUsers,
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

router.put('/:id(\\d+)', updateUsers);

router.post('/', createUsers);

router.delete('/byEmail', deleteUserByEmail);
router.delete('/byMobile', deleteUserByMobile);
router.delete('/:id(\\d+)', deleteUserById);

export default router;
