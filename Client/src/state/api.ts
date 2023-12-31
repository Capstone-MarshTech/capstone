import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  
  reducerPath: "main",
  //Names for each API data
  tagTypes: [
    "Dropdowns",
    "Claims",
    "LargestClaimsByLossBanding",
    "AverageTotalIncurredByLossBanding",
    "NumberOfClaimsByLossBanding",
    "TotalIncurredByLossBanding",
  ],
  // API Calls
  endpoints: (build) => ({
    // Insert here all endpoint calls

    /****** Drop downs ******/
    getYears: build.query({
      query: () => "/dropdown/years",
      providesTags: ["Dropdowns"],
    }),
    getLossBanding: build.query({
      query: () => "/dropdown/loss_banding_values",
      providesTags: ["Dropdowns"],
    }),
    getMarshLineOfBusiness1: build.query({
      query: () => "/dropdown/marsh_line_of_business_1",
      providesTags: ["Dropdowns"],
    }),
    getMarshLineOfBusiness2: build.query({
      query: () => "/dropdown/marsh_line_of_business_2",
      providesTags: ["Dropdowns"],
    }),

    /************* Claims ***************/
    // Number of claims by Policy Year - Open
    getOpenClaimsCount: build.query({
      query: (year) => `/claims/open_count/${year}`,
      providesTags: ["Claims"],
    }),

    // Number of claims by Policy Year - Closed
    getClosedClaimsCount: build.query({
      query: (year) => `/claims/closed_count/${year}`,
      providesTags: ["Claims"],
    }),

    // Number of Zero Value Claims by Policy Year
    getZeroValueClaimsCount: build.query({
      query: (year) => `/claims/zero_value_count/${year}`,
      providesTags: ["Claims"],
    }),

    // Total Outstanding by Policy Year
    getTotalOutstanding: build.query({
      query: (year) => `/claims/total_outstanding/${year}`,
      providesTags: ["Claims"],
    }),

    // Total Paid by Policy Year
    getTotalPaid: build.query({
      query: (year) => `/claims/total_net_paid/${year}`,
      providesTags: ["Claims"],
    }),

    // Largest Claim by Policy Year
    getLargestClaim: build.query({
      query: (year) => `/claims/largest/${year}`,
      providesTags: ["Claims"],
    }),

    /*********  Largeset Claims Average Total Incurred, Number of Claims, Total Incurred By Loss Banding  *********/
    // Largest Claims by Loss Banding
    getLargestClaimsByLossBanding: build.query({
      query: ({ lossBanding }) =>
        `/loss_banding/largest_claim_by?loss_banding=${lossBanding}`,
      providesTags: ["LargestClaimsByLossBanding"],
    }),

    // Average Total Incurred by Loss Banding
    getAverageTotalIncurredByLossBanding: build.query({
      query: ({ year, lossBanding }) =>
        `/loss_banding/average_total_incurred_by?loss_banding=${lossBanding}`,
      providesTags: ["AverageTotalIncurredByLossBanding"],
    }),

    // Number of Claims by Loss Banding
    getNumberOfClaimsByLossBanding: build.query({
      query: ({ lossBanding }) =>
        `/loss_banding/distinct_claim_numbers_by?loss_banding=${encodeURIComponent(
          lossBanding
        )}`,
      providesTags: ["NumberOfClaimsByLossBanding"],
    }),

    // Total Incurred By Loss Banding
    getTotalIncurredByLossBanding: build.query({
      query: ({ lossBanding }) =>
        `/loss_banding/total_incurred_by?loss_banding=${encodeURIComponent(
          lossBanding
        )}`,
      providesTags: ["TotalIncurredByLossBanding"],
    }),

    /*********** Loss Banding By Policy Year *STRETCH GOAL* *****************/

    // Average Total Incurred By Policy Year AND By Loss Banding
    // getAverageTotalIncurredByLossBanding: build.query({
    //   query: ({ year, lossBanding }) =>
    //     `/average_total_incurred_in/${year}?loss_banding=${encodeURIComponent(
    //       lossBanding
    //     )}`,
    //   providesTags: ["AverageTotalIncurred"],
    // }),

    // // Largest Claim By Policy Year by Loss Banding
    // getLargestClaimByLossBanding: build.query({
    //   query: ({ year, lossBanding }) =>
    //     `/loss_banding/largest_claim_by/${year}?loss_banding=${encodeURIComponent(
    //       lossBanding
    //     )}`,
    //   providesTags: ["LargestClaimByLossBanding"],
    // }),

    // // Number Of Claims by Policy Year by Loss Banding
    // getNumberOfClaimsByLossBanding: build.query({
    //   query: ({ year, lossBanding }) =>
    //     `/loss_banding/distinct_claim_numbers_by/${year}?loss_banding=${encodeURIComponent(
    //       lossBanding
    //     )}`,
    //   providesTags: ["NumberOfClaimsByLossBanding"],
    // }),

    // // Total Incurred By Policy Year by Loss Banding
    // getTotalIncurredByLossBanding: build.query({
    //   query: ({ year, lossBanding }) =>
    //     `/loss_banding/total_incurred_by/${year}?loss_banding=${encodeURIComponent(
    //       lossBanding
    //     )}`,
    //   providesTags: ["TotalIncurredByLossBanding"],
    // }),
  }),
});

export const {
  useGetYearsQuery,
  useGetLossBandingQuery,
  useGetMarshLineOfBusiness1Query,
  useGetMarshLineOfBusiness2Query,
  useGetOpenClaimsCountQuery,
  useGetClosedClaimsCountQuery,
  useGetZeroValueClaimsCountQuery,
  useGetTotalOutstandingQuery,
  useGetTotalPaidQuery,
  useGetLargestClaimQuery,
  useGetLargestClaimsByLossBandingQuery,
  useGetAverageTotalIncurredByLossBandingQuery,
  useGetNumberOfClaimsByLossBandingQuery,
  useGetTotalIncurredByLossBandingQuery,
} = api;
