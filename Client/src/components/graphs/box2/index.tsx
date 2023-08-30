import DashboardBox from "@/components/DashboardBox";
// import { useGetTotalOutstandingQuery, useGetTotalPaidQuery, useGetLargestClaimQuery } from '@/state/api';
import { useState, useEffect } from "react";
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



function GraphsBox2() {
  const [policyYear, setPolicyYear] = useState([]);

  const fetchData = async (years) => {
    const claimsData = await Promise.all(
		years.map(async (year) => {
			const endpoints = [
				`http://localhost:1337/claims/total_outstanding/${year}`,
				`http://localhost:1337/claims/total_net_paid/${year}`,
				`http://localhost:1337/claims/largest/${year}`,
			];

			const allData = await Promise.all(
				endpoints.map((endpoint) => axios.get(endpoint))
			);

			return {
				name: year.toString(),
				"Total Outstanding": allData[0].data,
				"Total Paid": allData[1].data,
				"Largest Claim": allData[2].data,
			};
		})
	)
    
    setPolicyYear(claimsData);
    // console.log(claimsData);
  };

  useEffect(() => {
    // let years = [];
    fetch("http://localhost:1337/dropdown/years")
		.then((response) => response.json())
		.then((yearsArray) => {
			fetchData(yearsArray);
		})
		.catch((error) => {
			console.error(error);
		});
  }, []);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b2">
        Total Incurred by Policy Year
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            width={200}
            height={400}
            data={policyYear}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Outstanding" stackId="a" fill="#002c77" />
            <Bar dataKey="Total Paid" stackId="a" fill="#76d3ff" />
            <Line type="monotone" dataKey="Largest Claim" stroke="#00968F" />
          </ComposedChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default GraphsBox2;
