import DashboardBox from '@/components/DashboardBox';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

function GraphsBox1() {
	const [policyClaimsByYear, setPolicyClaimsByYear] = useState([]);

	const fetchData = async (years) => {
		const claimsData = await Promise.all(
			years.map(async (year) => {
				const endpoints = [
					`http://localhost:1337/claims/open_count/${year}`,
					`http://localhost:1337/claims/closed_count/${year}`,
					`http://localhost:1337/claims/zero_value_count/${year}`,
				];

				const allData = await Promise.all(
					endpoints.map((endpoint) => axios.get(endpoint))
				);

				// Return our response in the allData variable as an array
				return {
					name: year.toString(),
					Open: allData[0].data,
					Closed: allData[1].data,
					ZeroValue: allData[2].data,
				};
			})
		);

		setPolicyClaimsByYear(claimsData);
		console.log(claimsData);
	};

	useEffect(() => {
		fetch('http://localhost:1337/dropdown/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				fetchData(yearsArray); // Array of years [2017, 2018, 2019, 2020, 2021, 2022]
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
		// console.log(policyClaimsByYear)
	}, []);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				Number of Claims by Policy Year
				{policyClaimsByYear.length > 0 ? (
					<ResponsiveContainer width='90%' height='90%'>
						<ComposedChart
							width={200}
							height={400}
							data={policyClaimsByYear}
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey='Open' stackId='a' fill='#002c77' />
							<Bar dataKey='Closed' stackId='a' fill='#76d3ff' />
							<Line type='monotone' dataKey='ZeroValue' stroke='#00968F' />
						</ComposedChart>
					</ResponsiveContainer>
				) : (
					<p>Loading Data ...</p>
				)}
			</DashboardBox>
		</>
	);
}

export default GraphsBox1;
