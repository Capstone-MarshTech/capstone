import DashboardBox from '@/components/DashboardBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import CustomTooltip from './CustomTooltip';

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

const styles = {
	backgroundColor: '#F8F8F8',
	padding: '.3rem',
	border: '1px solid #ccc',
	borderRadius: '10px',
	boxShadow: '0.15rem 0.15rem 0.25rem 0.1rem rgba(0, 0, 0, .1)',
};

function GraphsBox2() {
	const [policyYear, setPolicyYear] = useState([]);
	const [policyYearFilter, setPolicyYearFilter] = useState([]);

	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);

	const showTitle = !selectedMLB1
		? 'Total Incurred by Policy Year'
		: `Total Incurred by Policy Year by Business Line: ${
				selectedMLB1 ? `${selectedMLB1}` : ''
		  }`;

	// No filter
	const fetchData = async (years) => {
		const claimsData = await Promise.all(
			years.map(async (year) => {
				const endpoints = [
					`http://localhost:1337/metrics/total_outstanding/${year}`,
					`http://localhost:1337/metrics/total_net_paid/${year}`,
					`http://localhost:1337/metrics/largest_incurred/${year}`,
				];

				const allData = await Promise.all(
					endpoints.map((endpoint) => axios.get(endpoint))
				);

				return {
					name: year.toString(),
					'Total Outstanding': allData[0].data,
					'Total Paid': allData[1].data,
					'Largest Claim': allData[2].data,
				};
			})
		);
		setPolicyYear(claimsData);
	};

	useEffect(() => {
		fetch('http://localhost:1337/dropdowns/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				fetchData(yearsArray);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	// Fetch data with filter
	const fetchBusiness = async (years, businesses) => {
		const businessData = await Promise.all(
			years.map(async (year) => {
				// console.log(business)
				const endpoints = [
					`http://localhost:1337/metrics/total_outstanding_by_line_of_business/${year}?marsh_line_of_business_1=${businesses}`,
					`http://localhost:1337/metrics/total_net_paid_by_line_of_business/${year}?marsh_line_of_business_1=${businesses}`,
					`http://localhost:1337/metrics/largest_incurred_by_line_of_business/${year}?marsh_line_of_business_1=${businesses}`,
				];

				const allBusinessData = await Promise.all(
					endpoints.map((endpoint) => axios.get(endpoint))
				);
				// console.log(allBusinessData)

				return {
					name: year.toString(),
					'Total Outstanding': allBusinessData[0].data,
					'Total Paid': allBusinessData[1].data,
					'Largest Claim': allBusinessData[2].data,
				};
			})
		);
		setPolicyYearFilter(businessData);
	};

	useEffect(() => {
		const selectFilter = () => {
			fetch('http://localhost:1337/dropdowns/years')
				.then((response) => response.json())
				.then((yearsArray) => {
					fetchBusiness(yearsArray, selectedMLB1);
				})
				.catch((error) => {
					console.error(error);
				});
			// console.log(selectedMLB1)
		};
		if (selectedMLB1) {
			selectFilter();
		}
	}, [selectedMLB1]);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b2'>
				<h3>{showTitle}</h3>
				<ResponsiveContainer width='90%' height='90%'>
					<ComposedChart
						width={200}
						height={400}
						data={selectedMLB1 ? policyYearFilter : policyYear}
						margin={{
							top: 20,
							right: 20,
							left: 20,
							bottom: 20,
						}}
					>
						<XAxis dataKey='name' />
						<YAxis>
							<Label
								value={'Total Incurred'}
								angle={-90}
								offset={-15}
								position='insideLeft'
								style={{ textAnchor: 'middle' }}
							/>
						</YAxis>
						<Tooltip content={<CustomTooltip />} wrapperStyle={styles} />
						<Legend />
						<Bar dataKey='Total Outstanding' stackId='a' fill='#002c77' />
						<Bar dataKey='Total Paid' stackId='a' fill='#76d3ff' />
						<Line
							type='monotone'
							dataKey='Largest Claim'
							strokeWidth='2.5'
							stroke='#00968F'
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
}

export default GraphsBox2;
