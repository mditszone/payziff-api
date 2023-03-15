import { Router } from 'express';
import FireBase from '../services/s_firebase';

const router = Router();

//router.get("/test", (req, res) => res.send);
router.get("/getfirebaseConfig", FireBase.getfirebaseConfig);

export default router;