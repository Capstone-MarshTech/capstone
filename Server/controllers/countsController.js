
import Claim from '../models/ClaimModel.js';

export const closedCount = async (req, res) => {
    const  year  = parseInt(req.params.year)

    try { 
        
        const closed_claims_count = await Claim.countDocuments({ closed_claim: true, cleansed_policyyear: year}); 
        res.json(closed_claims_count);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }

};

export const openCount = async (req, res) => {
  const year = parseInt(req.params.year);

  try {
    const open_claims_count = await Claim.countDocuments({
      open_claim: true,
      cleansed_policyyear: year,
    });
    res.json(open_claims_count);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const zeroValueCount = async (req, res) => {
  const year = parseInt(req.params.year);

  try {
    const zero_value_claim_count = await Claim.countDocuments({
      zero_value_claim: true,
      cleansed_policyyear: year,
    });

    res.json(zero_value_claim_count);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const distinctClaimsCountByYear = async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const distinct_claims = await Claim.distinct("claim_number", {
      cleansed_policyyear: year,
    });
    const count = distinct_claims.length;
    res.json(count);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const distinctClaimsCount = async (req, res) => {
  try {
    const distinct_claims = await Claim.distinct("claim_number");
    const count = distinct_claims.length;
    res.json(count);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
