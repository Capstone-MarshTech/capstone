import express from 'express';
import {
  totalNetPaidByPolicyYear,
  largestIncurredByPolicyYear,
  totalOutstandingByPolicyYear,
  totalIncurredByPolicyYear,
  totalIncurred,
} from '../controllers/metricsController.js';

const router = express.Router();

router.get('/total_net_paid/:year', totalNetPaidByPolicyYear);
router.get('/total_outstanding/:year', totalOutstandingByPolicyYear );
router.get('/total_incurred/:year', totalIncurredByPolicyYear)
router.get('/largest_incurred/:year', largestIncurredByPolicyYear);
router.get('/total_incurred', totalIncurred)


export default router;
