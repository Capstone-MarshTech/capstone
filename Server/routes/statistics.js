import express from "express";

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
} from "../controllers/statisticsController.js";

const router = express.Router();
// All Years
router.get("/total_incurred_by", totalIncurredByLossBanding);
router.get("/number_of_claims_by", ClaimNumbersByLossBandingCount);
router.get("/largest_claim_by", largestClaimByLossBanding);
router.get("/average_total_incurred_by", averageTotalIncurredByLossBanding);

// By Year
router.get("/total_incurred_by/:year", totalIncurredByPolicyYearByLossBanding);
router.get(
  "/number_of_claims_by/:year",
  ClaimNumbersByPolicyYearByLossBandingCount
);
router.get(
  "/average_total_incurred_by/:year",
  averageTotalIncurredByPolicyYearbyLossBanding
);
router.get("/largest_claim_by/:year", largestClaimByPolicyYearByLossBanding);
router.get("/loss_banding_values_by/:year", lossBandingValuesByYear);

// By Product Line
/*Largest Claims by Loss Banding by Product line

Average Total Incurred by Loss Banding by Product Line

Number of Claims by Loss Banding by Product Line

Total Incurred by Loss Banding by Product Line */
router.get("total_incurred_by_line_of_business");
router.get("number_of_claims_by_line_of_business");
router.get("average_total_incurred_by_line_of_business");
router.get("largest_claim_by_line_of_business");

export default router;
