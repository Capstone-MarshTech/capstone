import express from 'express';
import {
  totalIncurredBy,
  distinctClaimNumbersBy,
  largestClaimBy,
  averageTotalIncurredBy,
  
  totalIncurredByPolicyYear,
  distinctClaimNumbersByPolicyYear,
  averageTotalIncurredByPolicyYear,
  largestClaimByPolicyYear,
} from '../controllers/lossBandingController.js';

const router = express.Router();
// All Years
router.get('/total_incurred_by', totalIncurredBy);
router.get('/distinct_claim_numbers_by', distinctClaimNumbersBy);
router.get('/largest_claim_by', largestClaimBy);
router.get('/average_total_incurred_by', averageTotalIncurredBy);

// By Year
router.get('/total_incurred_by/:year', totalIncurredByPolicyYear);
router.get('/distinct_claim_numbers_by/:year', distinctClaimNumbersByPolicyYear);
router.get('/average_total_incurred_by/:year', averageTotalIncurredByPolicyYear)
router.get('/largest_claim_by/:year', largestClaimByPolicyYear);
export default router;

