import { Router } from 'express';
import User from '../services/s_merchant';
import { verifyToken } from '../services/jwt';

const router = Router();

router.post("/createUser", verifyToken,  User.createUser);
router.post("/updateUser", verifyToken, User.updateUser);
router.get("/getAllUsers", verifyToken, User.getAllUsers);
router.get("/getAllStaff", verifyToken, User.getAllStaff);
router.get("/getUserById/:id", verifyToken, User.getUserById);

export default router;
