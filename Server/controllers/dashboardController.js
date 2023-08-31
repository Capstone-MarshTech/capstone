import Claim from '../models/ClaimModel.js';
import {
  totalIncurredByPolicyYear,
  largestIncurredByPolicyYear,
  totalOutstandingByPolicyYear,
} from './metricsController.js';

import {
  lossBandingValues,
  years,
  marshLineOfBusinesses1,
  marshLineOfBusinesses2,
  clients,
} from './dropDownsController.js';

import {
  closedCount,
  openCount,
  zeroValueCount,
} from './countsController.js';

import {
  averageTotalIncurredByPolicyYearbyLossBanding,
  largestClaimByPolicyYearByLossBanding,
  ClaimNumbersByPolicyYearByLossBandingCount,
} from './statisticsController.js';

export const getProcessedGraphData = async (filters) => {
  try {
    const filteredData = await Claim.find(filters);

    //Dropdowns
    const lossBandingValuesList = await lossBandingValues();
    const yearValues = await years();
    const lob1Values = await marshLineOfBusinesses1();
    const lob2Values = await marshLineOfBusinesses2();
    const clientValues = await clients();

    //1st Deliverable
    const closedClaimsCount = await closedCount(filters.year);
    const openClaimsCount = await openCount(filters.year);
    const zeroValueClaimsCount = await zeroValueCount(filters.year);

    //2nd Deliverable
    const totalIncurredByYear = await totalIncurredByPolicyYear(filters.year);
    const largestIncurredByYear = await largestIncurredByPolicyYear(filters.year);
    const totalOutstandingByYear = await totalOutstandingByPolicyYear(filters.year);

    //3rd Deliverable
    const totalIncurredByLossBandingValue = await ClaimNumbersByPolicyYearByLossBandingCount(
      filters.loss_banding,
      filters.year
    );
    const claimNumbersByLossBandingCount = await ClaimNumbersByPolicyYearByLossBandingCount(
      filters.loss_banding,
      filters.year
    );
    //4th deliverable
    const largestClaimByLossBanding = await largestClaimByPolicyYearByLossBanding(
      filters.loss_banding,
      filters.year
    );
    const averageCostPerClaimByLossBanding = await averageTotalIncurredByPolicyYearbyLossBanding(
      filters.loss_banding,
      filters.year
    );

    const processedGraphData = {
      totalIncurred,
      totalIncurredByYear,
      largestIncurredByYear,
      totalOutstandingByYear,
      lossBandingValuesList,
      yearValues,
      lob1Values,
      lob2Values,
      clientValues,
      closedClaimsCount,
      openClaimsCount,
      zeroValueClaimsCount,
      totalIncurredByLossBandingValue,
      claimNumbersByLossBandingCount,
      largestClaimByLossBanding,
      averageCostPerClaimByLossBanding,
    };

    return processedGraphData;
  } catch (error) {
    throw error;
  }
};
