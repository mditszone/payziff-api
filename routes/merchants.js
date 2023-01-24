import { Router } from 'express';
import Merchant from '../services/s_merchant';

const router = Router();

router.post("/addMerchant", Merchant.addMerchant);
router.get("/getAllMerchants", Merchant.getAllMerchants);
router.get("/getMerchantById/:id", Merchant.getMerchantById);
export default router;
