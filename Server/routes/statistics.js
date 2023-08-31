import express from 'express';

import {
  totalIncurredByLossBanding,
  ClaimNumbersByLossBandingCount,
  largestClaimByLossBanding,
  averageTotalIncurredByLossBanding,
  
  totalIncurredByPolicyYearByLossBanding,
  ClaimNumbersByPolicyYearByLossBandingCount,
  averageTotalIncurredByPolicyYearbyLossBanding,
  largestClaimByPolicyYearByLossBanding,
  lossBandingValuesByYear,

  largestClaimByLossBandingByProductLine,
  averageTotalIncurredByLossBandingByProductLine,
  ClaimNumbersByLossBandingCountByProductLine,
  totalIncurredByLossBandingByProductLine,
} from '../controllers/statisticsController.js';

const router = express.Router();
// All Years
router.get('/total_incurred_by', totalIncurredByLossBanding);
router.get('/number_of_claims_by', ClaimNumbersByLossBandingCount);
router.get('/largest_claim_by', largestClaimByLossBanding);
router.get('/average_total_incurred_by', averageTotalIncurredByLossBanding);

// By Year
router.get('/total_incurred_by/:year', totalIncurredByPolicyYearByLossBanding);
router.get('/number_of_claims_by/:year', ClaimNumbersByPolicyYearByLossBandingCount);
router.get('/average_total_incurred_by/:year', averageTotalIncurredByPolicyYearbyLossBanding)
router.get('/largest_claim_by/:year', largestClaimByPolicyYearByLossBanding);
router.get('/loss_banding_values_by/:year', lossBandingValuesByYear)

// By Product Line
router.get('/largest_claim_by_loss_banding_by_product_line', largestClaimByLossBandingByProductLine);
router.get('/average_total_incurred_by_loss_banding_by_product_line', averageTotalIncurredByLossBandingByProductLine);
router.get('/number_of_claims_by_loss_banding_by_product_line', ClaimNumbersByLossBandingCountByProductLine);
router.get('/total_incurred_by_loss_banding_by_product_line', totalIncurredByLossBandingByProductLine);

export default router;


