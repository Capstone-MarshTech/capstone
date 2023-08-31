import express from 'express';

import {
  totalNetPaidByPolicyYear,
  largestIncurredByPolicyYear,
  totalOutstandingByPolicyYear,
  totalIncurredByPolicyYear,
  totalIncurred,
  totalNetPaidByLineOfBusinessByPolicyYear,
  largestIncurredByLineOfBusinessByPolicyYear,
  totalOutstandingByLineOfBusinessByPolicyYear,
  totalIncurredByLineOfBusinessByPolicyYear,
  totalIncurredByLineOfBusiness,
} from '../controllers/metricsController.js';

const router = express.Router();

router.get('/total_net_paid/:year', totalNetPaidByPolicyYear);
router.get('/total_outstanding/:year', totalOutstandingByPolicyYear );
router.get('/total_incurred/:year', totalIncurredByPolicyYear)
router.get('/largest_incurred/:year', largestIncurredByPolicyYear);
router.get('/total_incurred', totalIncurred)

router.get('/total_net_paid_by_line_of_business/:year', totalNetPaidByLineOfBusinessByPolicyYear);
router.get('/total_outstanding_by_line_of_business/:year', totalOutstandingByLineOfBusinessByPolicyYear);
router.get('/total_incurred_by_line_of_business/:year', totalIncurredByLineOfBusinessByPolicyYear);
router.get('/largest_incurred_by_line_of_business/:year', largestIncurredByLineOfBusinessByPolicyYear);
router.get('/total_incurred_by_line_of_business', totalIncurredByLineOfBusiness);


export default router;
