import { Router } from 'express';
import Cashfree from '../services/s_cashfree';

const router = Router();
router.get("/test", (req, res) => res.status(200).end("done"));
router.get("/getBalance", Cashfree.getBalance);
router.get("/requestTransfer", Cashfree.requestTransfer);

export default router;
