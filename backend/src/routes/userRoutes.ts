import express from 'express';
import {
  createUsers,
  updateUsers,
  deleteUserByEmail,
  deleteUserById,
  deleteUserByMobile,
  getUsers,
  findSingleUser,
} from '@controllers/User';

const router = express.Router();

const uuidPattern =
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}';

const uuidRoute = new RegExp(`^/(?<uuid>${uuidPattern})$`);

router.get('/', getUsers);

router.get(uuidRoute, findSingleUser);
router.get('/:id(\\d+)', findSingleUser);
router.get('/byEmail', findSingleUser);

router.put('/:id(\\d+)', updateUsers);

router.post('/', createUsers);

router.delete('/byEmail', deleteUserByEmail);
router.delete('/byMobile', deleteUserByMobile);
router.delete('/:id(\\d+)', deleteUserById);

export default router;
