import DashboardBox from '@/components/DashboardBox';
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux"

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// Mock Data
const columns: GridColDef[] = [
	{ 
		field: 'year', 
		headerName: 'Year',
		type: 'string',
		width: 150 
	},
	{
		field: 'totalOutstanding',
		headerName: 'Total Outstanding',
		type: "number",
		width: 150,
		editable: true,
	},
	{
		field: 'totalPaid',
		headerName: 'Total Paid',
		type: 'number',
		width: 150,
		editable: true,
	},
	{
		field: 'largestClaim',
		headerName: 'Largest Claim',
		description: 'This column has a value getter and is not sortable.',
		editable: true,
		width: 150,
	},
];

function TableBox2() {
	const [policyYear, setPolicyYear] = useState([]);
	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
	const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

	console.log(selectedYear, selectedMLB1, selectedMLB2);

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
					id: year,
					year: year.toString(),
					totalOutstanding: allData[0].data,
					totalPaid: allData[1].data,
					largestClaim: allData[2].data,
				};
			})
		)
	
		setPolicyYear(claimsData);
		// console.log(claimsData);
	};

	useEffect(() => {
		// let years = [];
		fetch("http://localhost:1337/dropdowns/years")
			.then((response) => response.json())
			.then((yearsArray) => {
				fetchData(yearsArray);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);


	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b2'>
				Total Incurred by Policy Year
				<DataGrid
					rows={policyYear}
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

export default TableBox2;
