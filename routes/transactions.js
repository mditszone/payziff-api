import { Router } from 'express';
import Transactions from '../services/s_transaction';

const router = Router();

router.post("/addTransaction", Transactions.addTransaction);
router.get("/getAllTransactions", Transactions.getAllTransactions);
router.get("/getTodayTransactions", Transactions.getTodayTransactions);
router.get("/getTransactionsByDate/:date", Transactions.getTransactionsByDate);
router.get("/getTransactionsByMonth/:month", Transactions.getTransactionsByMonth);
router.get("/getTransactionsByWholeMonth/:month", Transactions.getTransactionsByWholeMonth);
router.get("/getTransactionsByYear/:year", Transactions.getTransactionsByYear);
router.get("/getTransactionsByDateRange", Transactions.getTransactionsByDateRange)
export default router;
