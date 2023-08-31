import express from 'express';

import {
  closedCountByYear,
  closedCountByYearByLineOfBusiness,
  openCountByYear,
  openCountByYearByLineOfBusiness,
  distinctClaimsCount,
  distinctClaimsCountByYear,
  distinctClaimsCountByLineOfBusiness, 
  distinctClaimsCountByYearByLineOfBusiness,
  zeroValueCountByYear,
  zeroValueCountByYearByLineOfBusiness,
} from '../controllers/countsController.js';

const router = express.Router();

router.get('/closed_count/:year', closedCountByYear);
router.get('/open_count/:year', openCountByYear);
router.get('/zero_value_count/:year', zeroValueCountByYear);
router.get('/distinct_claims_count/:year', distinctClaimsCountByYear);
router.get("/distinct_claims_count", distinctClaimsCount);

router.get('/closed_count_by_line_of_business/:year', closedCountByYearByLineOfBusiness);
router.get('/open_count_by_line_of_business/:year', openCountByYearByLineOfBusiness);
router.get('/zero_value_count_by_line_of_business/:year', zeroValueCountByYearByLineOfBusiness);
router.get('/distinct_claims_count_by_line_of_business/:year', distinctClaimsCountByYearByLineOfBusiness);
router.get('/distinct_claims_count_by_line_of_business', distinctClaimsCountByLineOfBusiness);

export default router;
