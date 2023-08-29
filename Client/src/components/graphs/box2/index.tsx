import DashboardBox from '@/components/DashboardBox';
// import { useGetTotalOutstandingQuery, useGetTotalPaidQuery, useGetLargestClaimQuery } from '@/state/api';
import { useState, useEffect } from "react"
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
  
// Mock data
//   const data = [
// 	{
// 	  name: "Page A",
// 	  uv: 4000,
// 	  pv: 2400,
// 	  amt: 2400
// 	},
// 	{
// 	  name: "Page B",
// 	  uv: 3000,
// 	  pv: 1398,
// 	  amt: 2210
// 	},
// 	{
// 	  name: "Page C",
// 	  uv: 2000,
// 	  pv: 9800,
// 	  amt: 2290
// 	},
// 	{
// 	  name: "Page D",
// 	  uv: 2780,
// 	  pv: 3908,
// 	  amt: 2000
// 	},
// 	{
// 	  name: "Page E",
// 	  uv: 1890,
// 	  pv: 4800,
// 	  amt: 2181
// 	},
// 	{
// 	  name: "Page F",
// 	  uv: 2390,
// 	  pv: 3800,
// 	  amt: 2500
// 	},
// 	{
// 	  name: "Page G",
// 	  uv: 3490,
// 	  pv: 4300,
// 	  amt: 2100
// 	}
//   ];


type Props = {};

function GraphsBox2({}: Props) {
	const [data, setData] = useState([])
	// const [years, setYears] = useState([])

	// useEffect(()=>{
	// 	const fetchYears = async ()=>{
	// 		try {
	// 			const response = (await axios.get(`http://localhost:1337/dropdown/years`)).data
	// 			// console.log(response)
	// 			setYears(response)
	// 			// console.log(years)
	// 		} catch (error) {
	// 			console.error(error)
	// 		}
	// 	}
	// 	fetchYears();
	// },[])

	
	// useEffect(()=>{
	// 	if(years.length > 0){
	// 		const fetch = async () =>{
	// 			try {
	// 				const totalOutstandingPromises = years.map(async (year) =>{
	// 					const response = (await axios.get(`http://localhost:1337/claims/total_outstanding/${year}`)).data
	// 					// console.log(response)
	// 					return response
	// 				})

	// 				const totalPaidPromises = years.map(async (year)=>{
	// 					const response = (await axios.get(`http://localhost:1337/claims/total_net_paid/${year}`)).data
	// 					// console.log(response)
	// 					return response
	// 				})

	// 				const largestClaimPromises = years.map(async (year)=>{
	// 					const response = (await axios.get(`http://localhost:1337/claims/largest/${year}`)).data
	// 					// console.log(response)
	// 					return response
	// 				})

	// 				const totalOutstandingPromises = await 

	// 			} catch (error) {
	// 				console.error(error)
	// 			}
	// 		}
	// 		fetch()
	// 	}
		
	// },[])

	const fetch = async (years) =>{
		const resultsData = []
		years.map((year)=>{
			const endpoints = [
				`http://localhost:1337/claims/total_outstanding/${year}`,
				`http://localhost:1337/claims/total_net_paid/${year}`,
				`http://localhost:1337/claims/largest/${year}`
			]

			Promise.all(
				endpoints.map((endpoint)=>{
					return axios.get(endpoint);
				})
			).then(
				axios.spread((...allData)=>{
					let claim = {
						name: year.toString(),
						"Total Outstanding": allData[0].data,
						"Total Paid": allData[1].data,
						"Largest Claim": allData[2].data
					}
					resultsData.push(claim)
				})
			)
		})
		setData(resultsData);
		console.log(resultsData)
	}

	useEffect(()=>{
		let years = [];
		fetch(`http://localhost:1337/dropdown/years`)
			.then((res)=> res.json())
			.then((yearsArray)=>{
				years = yearsArray;
				console.log(yearsArray);
				fetchData(years);
			})
			.catch((error)=>{
				console.error(error)
			})
	}, [])
	
	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b2'>
				Total Incurred by Policy Year
				<ResponsiveContainer width='100%' height='90%'>
					<ComposedChart
						width={200}
						height={400}
						data={data}
						margin={{
							top: 20,
							right: 20,
							left: 20,
							bottom: 20
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
