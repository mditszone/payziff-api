import { Router } from 'express';
import {login} from '../services/s_authentication'

const router = Router();

router.post("/login/:phoneNumber", login);

export default router;