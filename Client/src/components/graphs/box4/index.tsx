import DashboardBox from "@/components/DashboardBox";
import { useGetLossBandingQuery } from "@/state/api";
import axios from "axios";
import React, { useEffect, useState } from 'react';

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
} from 'recharts';

const GraphsBox4 = () => {
  const { data } = useGetLossBandingQuery();
  const [dataWithMetrics, setDataWithMetrics] = useState([]);

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        try {
          const largestClaimsPromises = data.map(async (eachBanding) => {
            const response = await axios.get(
              `http://localhost:1337/loss_banding/largest_claim_by?loss_banding=${eachBanding}`
            );
            return response.data; // Extract the data from the response
          });

          const averageTotalIncurredPromises = data.map(async (eachBanding) => {
            const response = await axios.get(
              `http://localhost:1337/loss_banding/average_total_incurred_by/2017?loss_banding=${eachBanding}`
            );
            return response.data;
          });

          const largestClaims = await Promise.all(largestClaimsPromises);

          const averageTotalIncurred = await Promise.all(
            averageTotalIncurredPromises
          );

          const newData = data.map((eachBanding, index) => ({
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
  }, [data]);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b4">
        Largest Claim Against Average Cost per Claim by Loss Band
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            width={600}
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
            <YAxis label={'Largest Claim'} />

            <Tooltip />
            <Legend />
            <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
            <Line type="monotone" dataKey="Average Total Incurred" stroke="#76d3ff" />
          </ComposedChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default GraphsBox4;
