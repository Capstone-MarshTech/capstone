import express from 'express';
import {
  closedCount,
  openCount,
  distinctClaimsCount,
  distinctClaimsCountByYear, 
  zeroValueCount,
} from '../controllers/countsController.js';

const router = express.Router();

router.get('/closed_count/:year', closedCount);
router.get('/open_count/:year', openCount);
router.get('/zero_value_count/:year', zeroValueCount);
router.get('/distinct_claims_count/:year', distinctClaimsCountByYear);
router.get("/distinct_claims_count", distinctClaimsCount);


export default router;
