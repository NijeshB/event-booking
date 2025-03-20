import express from "express";
import { createUsers, getUsers } from "../controllers/User";
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUsers);

export default router;
