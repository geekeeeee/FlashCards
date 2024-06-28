import express from "express";
import { registerUser, updateUser, deleteUser, readUser, loginUser } from "../controllers/user.js";
const router = express.Router();

router.get('/', readUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
export default router 