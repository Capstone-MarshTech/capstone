import express from 'express';
import {
  closedCount,
  openCount, 
  zeroValueCount,
  totalNetPaid,
  largest,
  totalOutstanding
} from '../controllers/claimsController.js';

const router = express.Router();

router.get('/closed_count/:year', closedCount);
router.get('/open_count/:year', openCount);
router.get('/zero_value_count/:year', zeroValueCount);

router.get('/total_net_paid/:year', totalNetPaid);
router.get('/total_outstanding/:year', totalOutstanding )

router.get('/largest/:year', largest);



export default router;
