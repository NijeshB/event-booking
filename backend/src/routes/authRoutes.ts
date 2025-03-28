import { authLogin } from '@controllers/Auth';
import express from 'express';
const router = express.Router();

router.post('/login', authLogin);

// router.post("/login", (req, res) => {
//   res.json({ message: "Login route is working!" });
// });
// router.get('/logout', authLogout);
export default router;
