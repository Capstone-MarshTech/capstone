import express from 'express';

import {
  lossBandingValues,
  years,
  marshLineOfBusinesses1,
  marshLineOfBusinesses2,
  clients,
  lossBandingValuesbyProductLine,
} from '../controllers/dropDownsController.js';

const router = express.Router();

router.get('/loss_banding_values', lossBandingValues);
router.get('/years', years);
router.get('/marsh_line_of_business_1', marshLineOfBusinesses1);
router.get('/marsh_line_of_business_2', marshLineOfBusinesses2);
router.get('/clients', clients)
router.get('/loss_banding_values_by_product_line', lossBandingValuesbyProductLine)

export default router;
