import DashboardBox from '@/components/DashboardBox';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
	{
		field: 'Loss Band',
		headerName: 'Loss Band',
		headerClassName: 'su-header',
		type: 'string',
		minWidth: 20,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'Largest Claim',
		headerName: 'Largest Claim',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'Average Cost of Claim',
		headerName: 'Average Cost of Claim',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
];

type Props = {};

function TableBox4({}: Props) {
	const [lossBandingData, setLossBandingData] = useState([]);
	const [dataWithMetrics, setDataWithMetrics] = useState([]);
	const baseUrl = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const fetchLossBandingData = async () => {
			try {
				// console.log(import.meta.env.VITE_BASE_URL);
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

	useEffect(() => {
		if (lossBandingData.length > 0) {
			const fetchData = async () => {
				try {
					const largestClaimsPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/largest_claim_by?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);

					const averageTotalIncurredPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/average_total_incurred_by?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);

					const largestClaims = await Promise.all(largestClaimsPromises);
					const averageTotalIncurred = await Promise.all(
						averageTotalIncurredPromises
					);

					const newData = lossBandingData.map((eachBanding, index) => ({
						id: index,
						'Loss Band': eachBanding,
						'Average Cost of Claim': averageTotalIncurred[index],
						'Largest Claim': largestClaims[index],
					}));

					setDataWithMetrics(newData);
				} catch (err) {
					console.error(err);
				}
			};

			fetchData();
		}
	}, [lossBandingData]);

	//   console.log(dataWithMetrics);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b4'>
				<h3>Largest Claim Against Average Cost per Claim by Loss Band</h3>
				<DataGrid
					rows={dataWithMetrics}
					columns={columns}
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

export default TableBox4;
