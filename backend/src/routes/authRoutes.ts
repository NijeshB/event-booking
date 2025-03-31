import {
  authLogin,
  dashboard,
  authLogout,
  adminLogin,
  verifyAuthToken,
} from '@controllers/Auth';
import express from 'express';
const router = express.Router();

router.post('/adminLogin', adminLogin);
router.post('/login', authLogin);

router.get('/dashboard', dashboard);
router.get('/logout', authLogout);

// router.post('/verifyToken', (req, res) => {
//   const token = req.body.token;
//   const validateToken = verifyAuthToken(token);

//   res.status(200).json({
//     status: 'success',
//     message: 'Token is valid',
//     data: validateToken,
//   });
// });

export default router;
