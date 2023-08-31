import Claim from '../models/ClaimModel.js';

export const closedCountByYear = async (req, res) => {
    const  year  = parseInt(req.params.year)

    try { 
        
        const closed_claims_count = await Claim.countDocuments({ 
          closed_claim: true, 
          cleansed_policyyear: year}); 
        res.json(closed_claims_count);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }

};
export const closedCountByYearByLineOfBusiness = async (req, res) => {
  const  year  = parseInt(req.params.year)
  const line_of_business = req.query.marsh_line_of_business_1

  try { 
      
      const closed_claims_count = await Claim.countDocuments({ 
        closed_claim: true, 
        cleansed_policyyear: year, 
        marsh_line_of_business_1: line_of_business}); 

      res.json(closed_claims_count);
  } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
  }

};

export const openCountByYear = async (req, res) => {
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
export const openCountByYearByLineOfBusiness = async (req, res) => {
  const year = parseInt(req.params.year);
  const line_of_business = req.query.marsh_line_of_business_1;

  try {
    const open_claims_count = await Claim.countDocuments({
      open_claim: true,
      cleansed_policyyear: year,
      marsh_line_of_business_1: line_of_business,

    });
    res.json(open_claims_count);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
export const zeroValueCountByYear = async (req, res) => {
  const year = parseInt(req.params.year);
  const line_of_business = req.query.marsh_line_of_business_1;
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
export const zeroValueCountByYearByLineOfBusiness = async (req, res) => {
  const year = parseInt(req.params.year);
  const line_of_business = req.query.marsh_line_of_business_1;
  try {
    const zero_value_claim_count = await Claim.countDocuments({
      zero_value_claim: true,
      cleansed_policyyear: year,
      marsh_line_of_business_1: line_of_business,
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
export const distinctClaimsCountByYearByLineOfBusiness = async (req, res) => {
  const year = parseInt(req.params.year);
  const line_of_business = req.query.marsh_line_of_business_1;
  try {
    const distinct_claims = await Claim.distinct("claim_number", {
      cleansed_policyyear: year,
      marsh_line_of_business_1: line_of_business,
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
export const distinctClaimsCountByLineOfBusiness = async (req, res) => {
  const line_of_business = req.query.marsh_line_of_business_1
  try {
    const distinct_claims = await Claim.distinct("claim_number", { marsh_line_of_business_1: line_of_business });
    const count = distinct_claims.length;
    res.json(count);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
