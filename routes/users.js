import { Router } from 'express';
import Merchant from '../services/s_merchant';

const router = Router();

router.post("/createUser", Merchant.createUser);
router.post("/updateUser", Merchant.updateUser);
router.get("/getAllMerchants", Merchant.getAllMerchants);
router.get("/getAllStaff", Merchant.getAllStaff);
router.get("/getMerchantById/:id", Merchant.getMerchantById);

export default router;
