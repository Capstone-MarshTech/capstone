import express from 'express';

import { getProcessedGraphData } from '../controllers/dashboardController.js' 

const router = express.Router();

router.get('/graph_data', async (req, res) => {
  try {
    const { year, client, productLine1, productLine2 } = req.query;

    const filters = {
      year: parseInt(year),
      client,
      productLine1,
      productLine2,
    };

    const processedGraphData = await getProcessedGraphData(filters);

    res.json(processedGraphData);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
