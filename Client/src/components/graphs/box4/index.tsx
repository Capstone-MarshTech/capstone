import DashboardBox from "@/components/DashboardBox";
import {
  useGetAverageTotalIncurredByLossBandingQuery,
  useGetLargestClaimsByLossBandingQuery,
  useGetLossBandingQuery,
} from "@/state/api";

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

type Props = {};

function GraphsBox4({}: Props) {
  const { data } = useGetLossBandingQuery();

  const largestClaims = data
    ? data.map((eachBanding) => ({
        lossBanding: eachBanding,
        data: useGetLargestClaimsByLossBandingQuery({
          lossBanding: eachBanding,
        }).data,
      }))
    : [];

  const averageTotalIncurred = data
    ? data.map((eachBanding) => ({
        lossBanding: eachBanding,
        data: useGetAverageTotalIncurredByLossBandingQuery({
          lossBanding: eachBanding,
        }).data,
      }))
    : [];

  const newData = data
    ? data.map((eachBanding, index) => ({
        "Loss Banding": eachBanding,
        "Average Total Incurred": largestClaims[index]?.data,
        "Largest Claim": averageTotalIncurred[index]?.data,
      }))
    : [];

  console.log(newData);
  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b4">
        Largest Claim Against Average Cost per Claim by Loss Band
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            width={200}
            height={400}
            data={newData}
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
            {/* <Bar dataKey="amt" stackId="a" fill="#76d3ff" /> */}
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
}

export default GraphsBox4;
