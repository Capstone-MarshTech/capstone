// import DashboardBox from "@/components/DashboardBox";
// import {
//   useGetAverageTotalIncurredByLossBandingQuery,
//   useGetLargestClaimsByLossBandingQuery,
//   useGetLossBandingQuery,
// } from "@/state/api";

// import {
//   ComposedChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Line,
// } from "recharts";

// type Props = {};

// function GraphsBox4({}: Props) {
//   const { data } = useGetLossBandingQuery();

//   const largestClaims = data
//     ? data.map((eachBanding) => ({
//         lossBanding: eachBanding,
//         data: useGetLargestClaimsByLossBandingQuery({
//           lossBanding: eachBanding,
//         }).data,
//       }))
//     : [];

//   const averageTotalIncurred = data
//     ? data.map((eachBanding) => ({
//         lossBanding: eachBanding,
//         data: useGetAverageTotalIncurredByLossBandingQuery({
//           lossBanding: eachBanding,
//         }).data,
//       }))
//     : [];

//   const newData = data
//     ? data.map((eachBanding, index) => ({
//         "Loss Banding": eachBanding,
//         "Average Total Incurred": largestClaims[index]?.data,
//         "Largest Claim": averageTotalIncurred[index]?.data,
//       }))
//     : [];

//   console.log(newData);
//   return (
//     <>
//       <DashboardBox bgcolor="#fff" gridArea="b4">
//         Largest Claim Against Average Cost per Claim by Loss Band
//         <ResponsiveContainer width="100%" height="90%">
//           <ComposedChart
//             width={200}
//             height={400}
//             data={newData}
//             margin={{
//               top: 20,
//               right: 20,
//               left: 20,
//               bottom: 20,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Loss Banding" />
//             <YAxis label={"Largest Claim"} />

//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
//             {/* <Bar dataKey="amt" stackId="a" fill="#76d3ff" /> */}
//             <Line
//               type="monotone"
//               dataKey="Average Total Incurred"
//               stroke="#76d3ff"
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </DashboardBox>
//     </>
//   );
// }

// export default GraphsBox4;

  // import React, { useEffect, useState } from 'react';
// import DashboardBox from '@/components/DashboardBox';
// import {
//   ComposedChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Line,
// } from 'recharts';

// type Props = {};

// function GraphsBox4({}: Props) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Define the API endpoint URL
//     const apiUrl = 'http://localhost:1337/dropdown/loss_banding_values'; // Replace with your actual API URL

//     // Fetch data from the API
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((responseData) => {
//         // Update the state with the fetched data
//         setData(responseData);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <>
//       <DashboardBox bgcolor="#fff" gridArea="b4">
//         Largest Claim Against Average Cost per Claim by Loss Band
//         <ResponsiveContainer width="100%" height="90%">
//           <ComposedChart
//             width={200}
//             height={400}
//             data={data.map((lossBanding) => ({
//               'Loss Banding': lossBanding,
//               'Largest Claim': 0, // You can add the appropriate values here if available
//               'Average Total Incurred': 0, // You can add the appropriate values here if available
//             }))}
//             margin={{
//               top: 20,
//               right: 20,
//               left: 20,
//               bottom: 20,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Loss Banding" />
//             <YAxis label={'Largest Claim'} />

//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
//             <Line type="monotone" dataKey="Average Total Incurred" stroke="#76d3ff" />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </DashboardBox>
//     </>
//   );
// }

// export default GraphsBox4;
//////////

// import React, { useEffect, useState } from 'react';
// import DashboardBox from '@/components/DashboardBox';
// import {
//   ComposedChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Line,
// } from 'recharts';

// type Props = {};

// function GraphsBox4({}: Props) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Define the API endpoint URL
//     const apiUrl = 'http://localhost:1337/dropdown/loss_banding_values'; // Replace with your actual API URL

//     // Fetch data from the API
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((responseData) => {
//         // Update the state with the fetched data
//         setData(responseData);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <>
//       <DashboardBox bgcolor="#fff" gridArea="b4">
//         Largest Claim Against Average Cost per Claim by Loss Band
//         <ResponsiveContainer width="100%" height="90%">
//           <ComposedChart
//             width={600}
//             height={400}
//             data={data.map((lossBanding) => ({
//               'Loss Banding': lossBanding,
//               'Largest Claim': 1000, // Replace with actual value if available
//               'Average Total Incurred': 500, // Replace with actual value if available
//             }))}
//             margin={{
//               top: 20,
//               right: 20,
//               left: 20,
//               bottom: 20,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Loss Banding" />
//             <YAxis label={'Largest Claim'} />

//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
//             <Line type="monotone" dataKey="Average Total Incurred" stroke="#76d3ff" />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </DashboardBox>
//     </>
//   );
// }

// export default GraphsBox4;


import React, { useEffect, useState } from 'react';
import DashboardBox from '@/components/DashboardBox';
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

type Props = {};

function GraphsBox4({}: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = 'http://localhost:1337/dropdown/loss_banding_values'; // Replace with your actual API URL

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Update the state with the fetched data
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b4">
        Largest Claim Against Average Cost per Claim by Loss Band
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            width={600}
            height={400}
            data={data.map((lossBanding) => ({
              'Loss Banding': lossBanding,
              'Largest Claim': 0, // You can add the appropriate values here if available
              'Average Total Incurred': 0, // You can add the appropriate values here if available
            }))}
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
}

export default GraphsBox4;
