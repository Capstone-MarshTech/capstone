import DashboardBox from '@/components/DashboardBox';

import { useEffect, useState } from 'react';
import axios from 'axios';

import {
	DataGrid,
	GridColDef,
	GridValueGetterParams,
	GridCellParams,
} from '@mui/x-data-grid';

// Mock Data
const columns: GridColDef[] = [
	{
		field: 'year',
		headerName: 'Year',
		type: 'string',
		width: 150,
	},
	{
		field: 'open',
		headerName: 'Open',
		type: 'number',
		width: 150,
		editable: true,
	},
	{
		field: 'closed',
		headerName: 'Closed',
		type: 'number',
		width: 150,
		editable: true,
	},
	{
		field: 'zeroValueClaims',
		headerName: 'Zero Value Claims',
		type: 'number',
		width: 150,
		editable: true,
	},
];

type Props = {};

function TableBox1({}: Props) {
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
		console.log('claims', claimsData);
	};

	useEffect(() => {
		let years = [];
		fetch('http://localhost:1337/dropdown/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				years = yearsArray;
				console.log('years', yearsArray);
				fetchData(years); // Array of years [2017, 2018, 2019, 2020, 2021, 2022]
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});

		console.log(policyClaimsByYear);
	}, []);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				Number of Claims by Policy Year
				<DataGrid
					rows={policyClaimsByYear}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					checkboxSelection
					disableRowSelectionOnClick
				/>
			</DashboardBox>
		</>
	);
}

export default TableBox1;
