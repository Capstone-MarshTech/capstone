import DashboardBox from '@/components/DashboardBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Data
const columns: GridColDef[] = [
	{
		field: 'year',
		headerName: 'Year',
		headerClassName: 'su-header',
		type: 'string',
		minWidth: 20,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'open',
		headerName: 'Open',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'closed',
		headerName: 'Closed',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'zeroValueClaims',
		headerName: 'Zero Value Claims',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 100,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
];

type Props = {};

function TableBox1({}: Props) {
	const [policyClaimsByYear, setPolicyClaimsByYear] = useState([]);
	const [policyClaimsByYearMLB, setPolicyClaimsByYearMLB] = useState([]);

	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const showTitle = !selectedMLB1
		? 'Number of Claims by Policy Year'
		: `Number of Claims by Policy Year by Business Line: ${
				selectedMLB1 ? `${selectedMLB1}` : ''
		  }`;

	console.log('From XG-Table', selectedYear, selectedMLB1);

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
				// Return our response in the allData variable as an array, setting ID to year
				return {
					id: year,
					year: year.toString(),
					open: allData[0].data,
					closed: allData[1].data,
					zeroValueClaims: allData[2].data,
				};
			})
		);
		setPolicyClaimsByYear(claimsData);
		console.log('claimsData', claimsData);
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
					id: year,
					year: year.toString(),
					open: allData[0].data,
					closed: allData[1].data,
					zeroValueClaims: allData[2].data,
				};
			})
		);

		console.log('claimsDataMLB', claimsDataMLB);

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
		console.log(policyClaimsByYear);
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
			console.log(policyClaimsByYearMLB);
		};

		if (selectedMLB1) {
			selectMLBFilter();
		}
	}, [selectedMLB1]);

	console.log('policyClaimsByYear', policyClaimsByYear);
	console.log('policyClaimsByYearMLB', policyClaimsByYearMLB);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				<h3>{showTitle}</h3>
				<DataGrid
					rows={selectedMLB1 ? policyClaimsByYearMLB : policyClaimsByYear}
					columns={columns}
					autoHeight={true}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
					sx={{
						m: 2,
						mb: 2,
						border: 0,
						'& .su-header': {
							backgroundColor: 'rgba(118, 211, 255, 0.25)',
						},
					}}
				/>
			</DashboardBox>
		</>
	);
}

export default TableBox1;
