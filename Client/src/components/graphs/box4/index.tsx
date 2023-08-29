import DashboardBox from "@/components/DashboardBox";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

const GraphsBox4 = () => {
  const [lossBandingData, setLossBandingData] = useState([]);
  const [dataWithMetrics, setDataWithMetrics] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchLossBandingData = async () => {
      try {
        // console.log(import.meta.env.VITE_BASE_URL);
        const response = await axios.get(
          `${baseUrl}/dropdown/loss_banding_values`
        );
        setLossBandingData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLossBandingData();
  }, []);

  useEffect(() => {
    if (lossBandingData.length > 0) {
      const fetchData = async () => {
        try {
          const largestClaimsPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/loss_banding/largest_claim_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const averageTotalIncurredPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/loss_banding/average_total_incurred_by?loss_banding=${eachBanding}`
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
            "Average Total Incurred": averageTotalIncurred[index],
            "Largest Claim": largestClaims[index],
          }));

          setDataWithMetrics(newData);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [lossBandingData]);

  console.log(dataWithMetrics);
  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b4">
        Largest Claim Against Average Cost per Claim by Loss Band
        <ResponsiveContainer width="100%" height="90%">
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Loss Banding" />
            <YAxis label={"Largest Claim"} />

            <Tooltip />
            <Legend />
            <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
            <Line
              type="monotone"
              dataKey="Average Total Incurred"
              stroke="#76d3ff"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default GraphsBox4;