import DashboardBox from '@/components/DashboardBox';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useGetZeroValueClaimsCountQuery } from '@/state/api';

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

	// Mock Data
	const data = [
		{
			name: '2016',
			Open: 0,
			Closed: 630,
			ZeroValue: 287,
		},
		{
			name: '2017',
			Open: 0,
			Closed: 829,
			ZeroValue: 454,
		},
		{
			name: '2018',
			Open: 6,
			Closed: 592,
			ZeroValue: 272,
		},
		{
			name: '2019',
			Open: 6,
			Closed: 702,
			ZeroValue: 358,
		},
		{
			name: '2020',
			Open: 78,
			Closed: 278,
			ZeroValue: 135,
		},
	];

	// remove hardcode , use data from a data source ?

	const fetchData = async (years) => {
		const claimsData = [];
		years.map((year) => {
			const endpoints = [
				`http://localhost:1337/claims/open_count/${year}`,
				`http://localhost:1337/claims/closed_count/${year}`,
				`http://localhost:1337/claims/zero_value_count/${year}`,
			];

			// Return our response in the allData variable as an array
			Promise.all(
				endpoints.map((endpoint) => {
					return axios.get(endpoint);
				})
			).then(
				axios.spread((...allData) => {
					let claim = {
						name: year.toString(),
						Open: allData[0].data,
						Closed: allData[1].data,
						ZeroValue: allData[2].data,
					};
					claimsData.push(claim);
				})
			);
		});

		setPolicyClaimsByYear(claimsData);
		console.log(claimsData);
	};

	useEffect(() => {
		const years = [2017, 2018, 2019, 2020, 2022];
		fetchData(years);
		console.log(policyClaimsByYear);
	}, []);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				Number of Claims by Policy Year
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
			</DashboardBox>
		</>
	);
}

export default GraphsBox1;
