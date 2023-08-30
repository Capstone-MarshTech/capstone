import express from 'express';
import {
  totalIncurredByLossBanding,
  distinctClaimNumbersByLossBanding,
  largestClaimByLossBanding,
  averageTotalIncurredByLossBanding,
  
  totalIncurredByPolicyYearByLossBanding,
  distinctClaimNumbersByPolicyYearByLossBanding,
  averageTotalIncurredByPolicyYearbyLossBanding,
  largestClaimByPolicyYearByLossBanding,
} from '../controllers/statisticsController.js';

const router = express.Router();
// All Years
router.get('/total_incurred_by', totalIncurredByLossBanding);
router.get('/distinct_claim_numbers_by', distinctClaimNumbersByLossBanding);
router.get('/largest_claim_by', largestClaimByLossBanding);
router.get('/average_total_incurred_by', averageTotalIncurredByLossBanding);

// By Year
router.get('/total_incurred_by/:year', totalIncurredByPolicyYearByLossBanding);
router.get('/distinct_claim_numbers_by/:year', distinctClaimNumbersByPolicyYearByLossBanding);
router.get('/average_total_incurred_by/:year', averageTotalIncurredByPolicyYearbyLossBanding)
router.get('/largest_claim_by/:year', largestClaimByPolicyYearByLossBanding);
export default router;

