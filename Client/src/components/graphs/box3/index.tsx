import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DashboardBox from '@/components/DashboardBox';

import {
	ComposedChart,
	Bar,
	XAxis,
	YAxis,
	Label,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Line,
} from 'recharts';
const GraphsBox3 = () => {
	const [lossBandingData, setLossBandingData] = useState([]);
	const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
	const [lossBandingDataProductLine, setLossBandingDataProductLine] = useState(
		[]
	);
	const [dataWithMetrics, setDataWithMetrics] = useState([]);
	const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
	const [dataWithMetricsProductLine, setDataWithMetricsProductLine] = useState(
		[]
	);
	const baseUrl = import.meta.env.VITE_BASE_URL;

	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);

	const showTitle = selectedYear
		? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedYear}`
		: selectedMLB1
		? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedMLB1}`
		: 'Number of Claim Against Total Cost per Claim by Loss Band by All Years';

	// useEffect for the case when there is no filter applied
	//fetch the loss bandings

	useEffect(() => {
		const fetchLossBandingData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}/dropdowns/loss_banding_values`
				);
				setLossBandingData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchLossBandingData();
	}, []);
	//fetch the loss bandings based on the year

	useEffect(() => {
		if (selectedYear) {
			const fetchLossBandingDataByYear = async () => {
				try {
					const response = await axios.get(
						`${baseUrl}/statistics/loss_banding_values_by/${selectedYear}`
					);
					setLossBandingDataYear(response.data);
				} catch (error) {
					console.error(error);
				}
			};
			fetchLossBandingDataByYear();
		}
	}, [selectedYear]);

	//fetch the loss bandings based on the product line
	/* Change the URL based on new end point */

	useEffect(() => {
		const fetchLossBandingDataByProductLine = async () => {
			try {
				const response = await axios.get(
					`http://localhost:1337/dropdowns/loss_banding_values_by_product_line?marsh_line_of_business_1=${selectedMLB1}
        `
				);
				setLossBandingDataProductLine(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		if (selectedMLB1) {
			fetchLossBandingDataByProductLine();
		}
	}, [selectedMLB1]);

	//Filter not applied

	useEffect(() => {
		if (lossBandingData.length > 0) {
			const fetchData = async () => {
				try {
					const totalIncurredPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
							);
							return {
								'Loss Banding': eachBanding,
								'Total Incurred': response.data, // Assuming this endpoint returns total incurred data
							};
						}
					);
					const numberOfClaimsPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
							);
							return {
								'Loss Banding': eachBanding,
								'Number of Claims': response.data, // Assuming this endpoint returns number of claims data
							};
						}
					);
					const totalIncurredData = await Promise.all(totalIncurredPromises);
					const numberOfClaimsData = await Promise.all(numberOfClaimsPromises);
					// Merge the data based on 'Loss Banding'
					const mergedData = totalIncurredData.map((item) => ({
						...item,
						...numberOfClaimsData.find(
							(entry) => entry['Loss Banding'] === item['Loss Banding']
						),
					}));
					setDataWithMetrics(mergedData);
				} catch (err) {
					console.error(err);
				}
			};
			fetchData();
		}
	}, [baseUrl, lossBandingData]);

	//if the year filter applied
	useEffect(() => {
		if (lossBandingDataYear.length > 0 && selectedYear) {
			const fetchDataByYear = async () => {
				try {
					const numberOfClaimsPromises = lossBandingDataYear.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/number_of_claims_by/${selectedYear}?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);
					const totalIncurredPromises = lossBandingDataYear.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);
					const numberOfClaims = await Promise.all(numberOfClaimsPromises);
					const totalIncurred = await Promise.all(totalIncurredPromises);
					const newData = lossBandingDataYear.map((eachBanding, index) => ({
						'Loss Banding': eachBanding,
						'Total Incurred': totalIncurred[index].toFixed(2),
						'Number of Claims': numberOfClaims[index].toFixed(2),
					}));
					setDataWithMetricsYear(newData);
				} catch (err) {
					console.error(err);
				}
			};
			fetchDataByYear();
		}
	}, [lossBandingDataYear, selectedYear]);

	//if the product line  filter is applied

	useEffect(() => {
		if (lossBandingDataProductLine.length > 0 && selectedMLB1) {
			const fetchDataByProductLine = async () => {
				try {
					const numberOfClaimsPromises = lossBandingDataProductLine.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
							);
							//http://localhost:1337/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000

							return response.data;
						}
					);

					const totalIncurredPromises = lossBandingDataProductLine.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
							);
							//http://localhost:1337/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000

							return response.data;
						}
					);

					const totalnumberofclaim = await Promise.all(numberOfClaimsPromises);
					const TotalIncurred = await Promise.all(totalIncurredPromises);

					const newData = lossBandingDataProductLine.map(
						(eachBanding, index) => ({
							'Loss Banding': eachBanding,
							'Total Incurred': TotalIncurred[index].toFixed(2),
							'Number of Claims': totalnumberofclaim[index].toFixed(2),
						})
					);

					setDataWithMetricsProductLine(newData);
				} catch (err) {
					console.error(err);
				}
			};
			fetchDataByProductLine();
		}
	}, [lossBandingDataProductLine, selectedMLB1]);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b3'>
				<h3>{showTitle}</h3>
				<ResponsiveContainer width='90%' height='90%'>
					{selectedYear ? (
						<ComposedChart
							width={200}
							height={400}
							data={dataWithMetricsYear}
							margin={{
								top: 20,
								right: 20,
								left: 20,
								bottom: 20,
							}}
						>
							<XAxis dataKey='Loss Banding' />
							<YAxis yAxisId='left' orientation='left' domain={[0, 10000]}>
								<Label
									value={'Total Incurred'}
									angle={-90}
									offset={-15}
									position='insideLeft'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<YAxis yAxisId='right' orientation='right' domain={[0, 1800]}>
								<Label
									value={'Number of Claims'}
									angle={-90}
									offset={-15}
									position='insideRight'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>

							<Tooltip />
							<Legend />
							<Bar
								dataKey='Total Incurred'
								stackId='a'
								fill='#002c77'
								yAxisId={'left'}
							/>
							<Line
								type='monotone'
								dataKey='Number of Claims'
								strokeWidth={2.5}
								stroke='#65cdff'
								yAxisId={'right'}
							/>
						</ComposedChart>
					) : selectedMLB1 ? (
						<ComposedChart
							width={200}
							height={400}
							data={dataWithMetricsProductLine}
							margin={{
								top: 20,
								right: 20,
								left: 20,
								bottom: 20,
							}}
						>
							<XAxis dataKey='Loss Banding' />
							<YAxis yAxisId='left' orientation='left' domain={[0, 10000]}>
								<Label
									value={'Total Incurred'}
									angle={-90}
									offset={-15}
									position='insideLeft'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<YAxis yAxisId='right' orientation='right' domain={[0, 1800]}>
								<Label
									value={'Number of Claims'}
									angle={-90}
									offset={-15}
									position='insideRight'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<Tooltip />
							<Legend />
							<Bar
								dataKey='Total Incurred'
								stackId='a'
								fill='#002c77'
								yAxisId='left'
							/>
							<Line
								type='monotone'
								dataKey='Number of Claims'
								strokeWidth={2.5}
								stroke='#65cdff'
								yAxisId='right'
							/>
						</ComposedChart>
					) : (
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
							<XAxis dataKey='Loss Banding' />
							<YAxis yAxisId='left' orientation='left' domain={[0, 10000]}>
								<Label
									value={'Total Incurred'}
									angle={-90}
									offset={-15}
									position='insideLeft'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<YAxis yAxisId='right' orientation='right' domain={[0, 1800]}>
								<Label
									value={'Number of Claims'}
									angle={-90}
									offset={-15}
									position='insideRight'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<Tooltip />
							<Legend />
							<Bar
								dataKey='Total Incurred'
								stackId='a'
								fill='#002c77'
								yAxisId='left'
							/>
							<Line
								type='monotone'
								dataKey='Number of Claims'
								strokeWidth={2.5}
								stroke='#65cdff'
								yAxisId='right'
							/>
						</ComposedChart>
					)}
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};
export default GraphsBox3;
