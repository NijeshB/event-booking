import { authLogin, dashboard, authLogout } from '@controllers/Auth';
import express from 'express';
const router = express.Router();

router.post('/login', authLogin);
router.get('/dashboard', dashboard);
router.get('/logout', authLogout);

export default router;
