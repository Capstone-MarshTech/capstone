import DashboardBox from '@/components/DashboardBox';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Label,
	ResponsiveContainer,
} from 'recharts';

function GraphsBox1() {
	const [policyClaimsByYear, setPolicyClaimsByYear] = useState([]);
	const [policyClaimsByYearMLB, setPolicyClaimsByYearMLB] = useState([]);

	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const showTitle = !selectedMLB1
		? 'Number of Claims by Policy Year'
		: `Number of Claims by Policy Year by Business Line: ${
				selectedMLB1 ? `${selectedMLB1}` : ''
		  }`;

	// console.log('From XG-BarChart', selectedYear, selectedMLB1);

	// No Filter Applied:
	const fetchData = async (years) => {
		const claimsData = await Promise.all(
			years.map(async (year) => {
				const endpoints = [
					`${baseUrl}/counts/open_count/${year}`,
					`${baseUrl}/counts/closed_count/${year}`,
					`${baseUrl}/counts/zero_value_count/${year}`,
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
	};

	// MLB Filter Applied
	// Number of Claims By Line Of Business By Year
	// const MLBendpoint = `${baseUrl}/counts/distinct_claims_count_by_line_of_business/${year}?marsh_line_of_business_1=Casualty`;
	const fetchDataMLB = async (years, mlbFilter) => {
		const claimsDataMLB = await Promise.all(
			years.map(async (year) => {
				const endpointsMLB = [
					`${baseUrl}/counts/open_count_by_line_of_business/${year}?marsh_line_of_business_1=${mlbFilter}`,
					`${baseUrl}/counts/closed_count_by_line_of_business/${year}?marsh_line_of_business_1=${mlbFilter}`,
					`${baseUrl}/counts/zero_value_count_by_line_of_business/${year}?marsh_line_of_business_1=${mlbFilter}`,
				];

				const allData = await Promise.all(
					endpointsMLB.map((endpoint) => axios.get(endpoint))
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

		// console.log('claimsDataMLB', claimsDataMLB);

		setPolicyClaimsByYearMLB(claimsDataMLB);
	};

	useEffect(() => {
		fetch('http://localhost:1337/dropdowns/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				// Array of years [2017, 2018, 2019, 2020, 2021, 2022]
				fetchData(yearsArray);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
		// console.log(policyClaimsByYearMLB);
	}, []);

	useEffect(() => {
		const selectMLBFilter = () => {
			fetch('http://localhost:1337/dropdowns/years')
				.then((response) => response.json())
				.then((yearsArray) => {
					// Array of years [2017, 2018, 2019, 2020, 2021, 2022]
					fetchDataMLB(yearsArray, selectedMLB1);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			// console.log(policyClaimsByYearMLB);
		};

		if (selectedMLB1) {
			selectMLBFilter();
		}
	}, [selectedMLB1]);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				<h3>{showTitle}</h3>
				{policyClaimsByYear.length > 0 ? (
					<ResponsiveContainer width='90%' height='90%'>
						<ComposedChart
							width={200}
							height={400}
							data={selectedMLB1 ? policyClaimsByYearMLB : policyClaimsByYear}
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<XAxis dataKey='name' />
							<YAxis>
								<Label
									value={'Number of Claims'}
									angle={-90}
									offset={-15}
									position='insideLeft'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<Tooltip />
							<Legend />
							<Bar dataKey='Open' stackId='a' fill='#002c77' />
							<Bar dataKey='Closed' stackId='a' fill='#65cdff' />
							<Line
								type='monotone'
								dataKey='ZeroValue'
								strokeWidth='2.5'
								stroke='#00968F'
							/>
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
