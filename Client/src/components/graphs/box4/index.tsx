import DashboardBox from "@/components/DashboardBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

const GraphsBox4 = () => {
  const [lossBandingData, setLossBandingData] = useState([]);
  const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
  const [lossBandingDataProductLine, setLossBandingDataProductLine] = useState(
    []
  );

  const [dataWithMetrics, setDataWithMetrics] = useState([]);
  const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
  const [dataWithMetricsProductLine, setDataWithMetricsProductLine] = useState(
    []
  );

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
  const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);
  const showTitle = selectedYear
    ? `Largest Claim Against Average Cost per Claim by Loss Band by ${selectedYear}`
    : selectedMLB1
    ? `Largest Claim Against Average Cost per Claim by Loss Band by ${selectedMLB1}`
    : "Largest Claim Against Average Cost per Claim by Loss Band by All Years";

  // useEffect for the case when there is no filter applied
  //fetch the loss bandings
  useEffect(() => {
    const fetchLossBandingData = async () => {
      try {
        // console.log(import.meta.env.VITE_BASE_URL);
        const response = await axios.get(
          `${baseUrl}/dropdowns/loss_banding_values`
        );
        setLossBandingData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLossBandingData();
  }, []);

  //fetch the loss bandings based on the year
  useEffect(() => {
    const fetchLossBandingDataByYear = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/statistics/loss_banding_values_by/${selectedYear}`
        );
        setLossBandingDataYear(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedYear) {
      fetchLossBandingDataByYear();
    }
  }, [selectedYear]);

  //fetch the loss bandings based on the product line
  /* Change the URL based on new end point */
  useEffect(() => {
    const fetchLossBandingDataByProductLine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/dropdowns/loss_banding_values_by_product_line?marsh_line_of_business_1=${selectedMLB1}
        `
        );
        setLossBandingDataProductLine(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedMLB1) {
      fetchLossBandingDataByProductLine();
    }
  }, [selectedMLB1]);

  //filter not applied
  useEffect(() => {
    if (lossBandingData.length > 0) {
      const fetchData = async () => {
        try {
          const largestClaimsPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/largest_claim_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const averageTotalIncurredPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/average_total_incurred_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const largestClaims = await Promise.all(largestClaimsPromises);
          const averageTotalIncurred = await Promise.all(
            averageTotalIncurredPromises
          );

          const newData = lossBandingData.map((eachBanding, index) => ({
            "Loss Banding": eachBanding,
            "Average Total Incurred": averageTotalIncurred[index].toFixed(2),
            "Largest Claim": largestClaims[index].toFixed(2),
          }));

          setDataWithMetrics(newData);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [lossBandingData]);

  // if the YEAR filter is applied
  useEffect(() => {
    /*change here */
    if (lossBandingDataYear.length > 0 && selectedYear) {
      const fetchDataByYear = async () => {
        try {
          const largestClaimsPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/largest_claim_by/${selectedYear}?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const averageTotalIncurredPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/average_total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const largestClaims = await Promise.all(largestClaimsPromises);
          const averageTotalIncurred = await Promise.all(
            averageTotalIncurredPromises
          );

          const newData = lossBandingDataYear.map((eachBanding, index) => ({
            "Loss Banding": eachBanding,
            "Average Total Incurred": averageTotalIncurred[index].toFixed(2),
            "Largest Claim": largestClaims[index].toFixed(2),
          }));

          setDataWithMetricsYear(newData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchDataByYear();
    }
  }, [lossBandingDataYear, selectedYear]);

  // If the PRODUCT LINE filter is applied

  useEffect(() => {
    if (lossBandingDataProductLine.length > 0 && selectedMLB1) {
      const fetchDataByProductLine = async () => {
        try {
          const largestClaimsPromises = lossBandingDataProductLine.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/largest_claim_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
              );
              //http://localhost:1337/statistics/largest_claim_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000
              return response.data;
            }
          );

          const averageTotalIncurredPromises = lossBandingDataProductLine.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/average_total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
              );
              //http://localhost:1337/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000
              return response.data;
            }
          );

          const largestClaims = await Promise.all(largestClaimsPromises);
          const averageTotalIncurred = await Promise.all(
            averageTotalIncurredPromises
          );

          const newData = lossBandingDataProductLine.map(
            (eachBanding, index) => ({
              "Loss Banding": eachBanding,
              "Average Total Incurred": averageTotalIncurred[index].toFixed(2),
              "Largest Claim": largestClaims[index].toFixed(2),
            })
          );

          setDataWithMetricsProductLine(newData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchDataByProductLine();
    }
  }, [lossBandingDataProductLine, selectedMLB1]);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b4">
        <h3>{showTitle}</h3>
        <ResponsiveContainer width="100%" height="90%">
          {selectedYear ? (
            <ComposedChart
              width={200}
              height={400}
              data={dataWithMetricsYear}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="Loss Banding" />
              <YAxis>
                <Label
                  value={"Largest Claim"}
                  angle={-90}
                  offset={-15}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />

              <Line
                type="monotone"
                dataKey="Average Total Incurred"
                strokeWidth="2.5"
                stroke="#65cdff"
              />
            </ComposedChart>
          ) : selectedMLB1 ? (
            <ComposedChart
              width={200}
              height={400}
              data={dataWithMetricsProductLine}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="Loss Banding" />
              <YAxis>
                <Label
                  value={"Largest Claim"}
                  angle={-90}
                  offset={-15}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />

              <Line
                type="monotone"
                dataKey="Average Total Incurred"
                strokeWidth="2.5"
                stroke="#65cdff"
              />
            </ComposedChart>
          ) : (
            <ComposedChart
              width={200}
              height={400}
              data={dataWithMetrics}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="Loss Banding" />
              <YAxis>
                <Label
                  value={"Largest Claim"}
                  angle={-90}
                  offset={-15}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>

              <Tooltip />
              <Legend />
              <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
              <Line
                type="monotone"
                dataKey="Average Total Incurred"
                strokeWidth="2.5"
                stroke="#65cdff"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default GraphsBox4;
