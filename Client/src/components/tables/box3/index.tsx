// import DashboardBox from '@/components/DashboardBox';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const columns: GridColDef[] = [
// 	{
// 		field: 'Loss Band',
// 		headerName: 'Loss Band',
// 		headerClassName: 'su-header',
// 		type: 'string',
// 		minWidth: 20,
// 		flex: 1,
// 		align: 'center',
// 		headerAlign: 'center',
// 	},

// 	{
// 		field: 'Number of Claims',
// 		headerName: 'Number of Claims',
// 		headerClassName: 'su-header',
// 		type: 'number',
// 		minWidth: 50,
// 		flex: 1,
// 		align: 'center',
// 		headerAlign: 'center',
// 	},

// 	{
// 		field: 'Total Incurred',
// 		headerName: 'Total Incurred',
// 		headerClassName: 'su-header',
// 		type: 'number',
// 		minWidth: 50,
// 		flex: 1,
// 		align: 'center',
// 		headerAlign: 'center',
// 	},
// ];
// type Props = {};

// function TableBox3({}: Props) {
// 	const [lossBandingData, setLossBandingData] = useState([]);
// 	const [dataWithMetrics, setDataWithMetrics] = useState([]);
// 	const baseUrl = import.meta.env.VITE_BASE_URL;

// 	useEffect(() => {
// 		const fetchLossBandingData = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${baseUrl}/dropdowns/loss_banding_values`
// 				);
// 				setLossBandingData(response.data);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};

// 		fetchLossBandingData();
// 	}, []);

// 	useEffect(() => {
// 		if (lossBandingData.length > 0) {
// 			const fetchData = async () => {
// 				try {
// 					const totalIncurredPromises = lossBandingData.map(
// 						async (eachBanding) => {
// 							const response = await axios.get(
// 								`${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
// 							);
// 							return response.data;
// 						}
// 					);

// 					const numberOfClaimsPromises = lossBandingData.map(
// 						async (eachBanding) => {
// 							const response = await axios.get(
// 								`${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
// 							);
// 							return response.data;
// 						}
// 					);

// 					const totalIncurred = await Promise.all(totalIncurredPromises);
// 					const numberOfClaims = await Promise.all(numberOfClaimsPromises);

// 					const newData = lossBandingData.map((eachBanding, index) => ({
// 						id: index,
// 						'Loss Band': eachBanding,
// 						'Total Incurred': totalIncurred[index],
// 						'Number of Claims': numberOfClaims[index],
// 					}));

// 					setDataWithMetrics(newData);
// 				} catch (err) {
// 					console.error(err);
// 				}
// 			};
// 			fetchData();
// 		}
// 	}, [lossBandingData]);

// 	return (
// 		<>
// 			<DashboardBox bgcolor='#fff' gridArea='b3'>
// 				<h3>Total Incurred Against Number of Claims by Loss Band</h3>
// 				<DataGrid
// 					rows={dataWithMetrics}
// 					columns={columns}
// 					autoHeight={true}
// 					initialState={{
// 						pagination: {
// 							paginationModel: {
// 								pageSize: 5,
// 							},
// 						},
// 					}}
// 					pageSizeOptions={[5]}
// 					disableRowSelectionOnClick
// 					sx={{
// 						m: 2,
// 						mb: 2,
// 						border: 0,
// 						'& .su-header': {
// 							backgroundColor: 'rgba(118, 211, 255, 0.25)',
// 						},
// 					}}
// 				/>
// 			</DashboardBox>
// 		</>
// 	);
// }

// export default TableBox3;



// import DashboardBox from '@/components/DashboardBox';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
// const columns: GridColDef[] = [
// 	{
// 		field: 'Loss Band',
// 		headerName: 'Loss Band',
// 		headerClassName: 'su-header',
// 		type: 'string',
// 		minWidth: 20,
// 		flex: 1,
// 		align: 'center',
// 		headerAlign: 'center',
// 	},

// 	{
// 		field: 'Number of Claims',
// 		headerName: 'Number of Claims',
// 		headerClassName: 'su-header',
// 		type: 'number',
// 		minWidth: 50,
// 		flex: 1,
// 		align: 'center',
// 		headerAlign: 'center',
// 	},

// 	{
// 		field: 'Total Incurred',
// 		headerName: 'Total Incurred',
// 		headerClassName: 'su-header',
// 		type: 'number',
// 		minWidth: 50,
// 		flex: 1,
// 		align: 'center',
// 		headerAlign: 'center',
// 	},
// ];
// type Props = {};

// function TableBox3({}: Props) {
// 	const [lossBandingData, setLossBandingData] = useState([]);
// 	const [dataWithMetrics, setDataWithMetrics] = useState([]);
// 	const [lossBandingDataProductLine, setLossBandingDataProductLine] = useState(
// 		[]
// 	  );
	
// 	  const [dataWithMetrics, setDataWithMetrics] = useState([]);
// 	  const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
// 	  const [dataWithMetricsProductLine, setDataWithMetricsProductLine] = useState(
// 		[]
// 	  );


// 	const baseUrl = import.meta.env.VITE_BASE_URL;

//     const selectedYear = useSelector((state) => state.filter.selectedYear);
//     const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
//     const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);
//     const showTitle = selectedYear
//     ? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedYear}`
//     : selectedMLB1
//     ? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedMLB1}`
//     : "Number of Claim Against Total Cost per Claim by Loss Band by All Years";
    
// 	useEffect(() => {
// 		const fetchLossBandingData = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${baseUrl}/dropdowns/loss_banding_values`
// 				);
// 				setLossBandingData(response.data);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};

// 		fetchLossBandingData();
// 	}, []);
// ///////

// useEffect(() => {
// 	if (selectedYear) {
// 		const fetchLossBandingDataByYear = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${baseUrl}/statistics/loss_banding_values_by/${selectedYear}`
// 				);
// 				setLossBandingDataYear(response.data);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		fetchLossBandingDataByYear();
// 	}
// }, [baseUrl, selectedYear]);
// //fetch the loss bandings based on the product line
// /* Change the URL based on new end point */
// useEffect(() => {
// const fetchLossBandingDataByProductLine = async () => {
//   try {
// 	const response = await axios.get(
// 	  `http://localhost:1337/dropdowns/loss_banding_values_by_product_line?marsh_line_of_business_1=${selectedMLB1}
// 	`
// 	);
// 	setLossBandingDataProductLine(response.data);
//   } catch (error) {
// 	console.error(error);
//   }
// };
// if (selectedMLB1) {
//   fetchLossBandingDataByProductLine();
// }
// }, [selectedMLB1]);




// 	useEffect(() => {
// 		if (lossBandingData.length > 0) {
// 			const fetchData = async () => {
// 				try {
// 					const totalIncurredPromises = lossBandingData.map(
// 						async (eachBanding) => {
// 							const response = await axios.get(
// 								`${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
// 							);
// 							return response.data;
// 						}
// 					);

// 					const numberOfClaimsPromises = lossBandingData.map(
// 						async (eachBanding) => {
// 							const response = await axios.get(
// 								`${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
// 							);
// 							return response.data;
// 						}
// 					);

// 					const totalIncurred = await Promise.all(totalIncurredPromises);
// 					const numberOfClaims = await Promise.all(numberOfClaimsPromises);

// 					const newData = lossBandingData.map((eachBanding, index) => ({
// 						id: index,
// 						'Loss Band': eachBanding,
// 						'Total Incurred': totalIncurred[index],
// 						'Number of Claims': numberOfClaims[index],
// 					}));

// 					setDataWithMetrics(newData);
// 				} catch (err) {
// 					console.error(err);
// 				}
// 			};
// 			fetchData();
// 		}
// 	}, [lossBandingData]);

//  // if the YEAR filter is applied
// //if the year filter applied 
// useEffect(() => {
// 	if (lossBandingDataYear.length > 0 && selectedYear) {
// 		const fetchDataByYear = async () => {
// 			try {
// 				const numberOfClaimsPromises = lossBandingDataYear.map(
// 					async (eachBanding) => {
// 						const response = await axios.get(
// 							`${baseUrl}/statistics/number_of_claims_by/${selectedYear}?loss_banding=${eachBanding}`
// 						);
// 						return response.data;
// 					}
// 				);
// 				const totalIncurredPromises = lossBandingDataYear.map(
// 					async (eachBanding) => {
// 						const response = await axios.get(
// 							`${baseUrl}/statistics/total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
// 						);
// 						return response.data;
// 					}
// 				);
// 				const numberOfClaims = await Promise.all(numberOfClaimsPromises);
// 				const totalIncurred = await Promise.all(totalIncurredPromises);
// 				const newData = lossBandingDataYear.map((eachBanding, index) => ({
// 					'Loss Banding': eachBanding,
// 					'Total Incurred': totalIncurred[index].toFixed(2),
// 					'Number of Claims': numberOfClaims[index].toFixed(2),
// 				}));
// 				setDataWithMetricsYear(newData);
// 			} catch (err) {
// 				console.error(err);
// 			}
// 		};
// 		fetchDataByYear();
// 	}
// }, [baseUrl, lossBandingDataYear, selectedYear]);
// //if the product line  filter is applied 

// useEffect(() => {
// if (lossBandingDataProductLine.length > 0 && selectedMLB1) {
//   const fetchDataByProductLine = async () => {
// 	try {
// 	  const numberOfClaimsPromises = lossBandingDataProductLine.map(
// 		async (eachBanding) => {
// 		  const response = await axios.get(
// 			`${baseUrl}/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
// 		  );
// 		  //http://localhost:1337/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000
// 		  return response.data;
// 		}
// 	  );
// 	  const totalIncurredPromises = lossBandingDataProductLine.map(
// 		async (eachBanding) => {
// 		  const response = await axios.get(
// 			`${baseUrl}/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
// 		  );
// 		  //http://localhost:1337/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000

// 		  return response.data;
// 		}
// 	  );
// 	  const totalnumberofclaim = await Promise.all(numberOfClaimsPromises);
// 	  const TotalIncurred = await Promise.all(
// 		totalIncurredPromises
// 	  );
// 	  const newData = lossBandingDataProductLine.map(
// 		(eachBanding, index) => ({
// 		  "Loss Banding": eachBanding,
// 		  "Total Incurred": TotalIncurred[index].toFixed(2),
// 		  "Number of Claims": totalnumberofclaim [index].toFixed(2),
// 		})
// 	  );
// 	  setDataWithMetricsProductLine(newData);
// 	} catch (err) {
// 	  console.error(err);
// 	}
//   };
//   fetchDataByProductLine();
// }
// }, [lossBandingDataProductLine, selectedMLB1]);



// 	return (
// 		<>
// 			<DashboardBox bgcolor='#fff' gridArea='b3'>
// 				<h3>{showTitle}</h3>
// 				<DataGrid
// 					 rows={dataWithMetricsYear}
// 					columns={columns}
// 					autoHeight={true}
// 					initialState={{
// 						pagination: {
// 							paginationModel: {
// 								pageSize: 5,
// 							},
// 						},
// 					}}
// 					pageSizeOptions={[5]}
// 					disableRowSelectionOnClick
// 					sx={{
// 						m: 2,
// 						mb: 2,
// 						border: 0,
// 						'& .su-header': {
// 							backgroundColor: 'rgba(118, 211, 255, 0.25)',
// 						},
// 					}}

// 				/>

//       ) : selectedMLB1 ? (
//           <DataGrid
//             rows={dataWithMetricsProductLine}
//             columns={columns}
//             autoHeight={true}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 5,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             disableRowSelectionOnClick
//             sx={{
//               m: 2,
//               mb: 2,
//               border: 0,
//               "& .su-header": {
//                 backgroundColor: "rgba(118, 211, 255, 0.25)",
//               },
//             }}
//           />
//         ) : (
//           <DataGrid
//             rows={dataWithMetrics}
//             columns={columns}
//             autoHeight={true}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 5,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             disableRowSelectionOnClick
//             sx={{
//               m: 2,
//               mb: 2,
//               border: 0,
//               "& .su-header": {
//                 backgroundColor: "rgba(118, 211, 255, 0.25)",
//               },
//             }}
//           />
//         )}

// 			</DashboardBox>
// 		</>
// 	);
// }

// export default TableBox3;
////////////////




// import DashboardBox from '@/components/DashboardBox';
// import { DataGrid, GridColDef ,GridValueGetterParams } from '@mui/x-data-grid';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";

// const columns: GridColDef[] = [
//   {
//     field: 'Loss Band',
//     headerName: 'Loss Band',
//     headerClassName: 'su-header',
//     type: 'string',
//     minWidth: 20,
//     flex: 1,
//     align: 'center',
//     headerAlign: 'center',
//   },
//   {
//     field: 'Number of Claims',
//     headerName: 'Number of Claims',
//     headerClassName: 'su-header',
//     type: 'number',
//     minWidth: 50,
//     flex: 1,
//     align: 'center',
//     headerAlign: 'center',
//   },
//   {
//     field: 'Total Incurred',
//     headerName: 'Total Incurred',
//     headerClassName: 'su-header',
//     type: 'number',
//     minWidth: 50,
//     flex: 1,
//     align: 'center',
//     headerAlign: 'center',
//   },
// ];

// type Props = {};
// function TableBox3({}: Props) {
//   const [lossBandingData, setLossBandingData] = useState([]);
//   const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
//   const [lossBandingDataProductLine, setLossBandingDataProductLine] = useState([]);
//   const [dataWithMetrics, setDataWithMetrics] = useState([]);
//   const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
//   const [dataWithMetricsProductLine, setDataWithMetricsProductLine] = useState([]);



//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const selectedYear = useSelector((state) => state.filter.selectedYear);
//   const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
//   const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

//   const showTitle = selectedYear
//     ? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedYear}`
//     : selectedMLB1
//     ? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedMLB1}`
//     : "Number of Claim Against Total Cost per Claim by Loss Band by All Years";

//   useEffect(() => {
//     const fetchLossBandingData = async () => {
//       try {
//         const response = await axios.get(
//           `${baseUrl}/dropdowns/loss_banding_values`
//         );
//         setLossBandingData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchLossBandingData();
//   }, []);

//   useEffect(() => {
//     if (selectedYear) {
//       const fetchLossBandingDataByYear = async () => {
//         try {
//           const response = await axios.get(
//             `${baseUrl}/statistics/loss_banding_values_by/${selectedYear}`
//           );
//           setLossBandingDataYear(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchLossBandingDataByYear();
//     }
//   }, [baseUrl, selectedYear]);

//   useEffect(() => {
//     if (selectedMLB1) {
//       const fetchLossBandingDataByProductLine = async () => {
//         try {
//           const response = await axios.get(
//             `${baseUrl}/dropdowns/loss_banding_values_by_product_line?marsh_line_of_business_1=${selectedMLB1}`
//           );
//           setLossBandingDataProductLine(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchLossBandingDataByProductLine();
//     }
//   }, [baseUrl, selectedMLB1]);

//   useEffect(() => {
//     if (lossBandingData.length > 0) {
//       const fetchData = async () => {
//         try {
//           const totalIncurredPromises = lossBandingData.map(async (eachBanding) => {
//             const response = await axios.get(
//               `${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
//             );
//             return response.data;
//           });

//           const numberOfClaimsPromises = lossBandingData.map(async (eachBanding) => {
//             const response = await axios.get(
//               `${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
//             );
//             return response.data;
//           });

//           const totalIncurred = await Promise.all(totalIncurredPromises);
//           const numberOfClaims = await Promise.all(numberOfClaimsPromises);

//           const newData = lossBandingData.map((eachBanding, index) => ({
//             id: index,
//             'Loss Band': eachBanding,
//             'Total Incurred': totalIncurred[index],
//             'Number of Claims': numberOfClaims[index],
//           }));

//           setDataWithMetrics(newData);
//         } catch (err) {
//           console.error(err);
//         }
//       };

//       fetchData();
//     }
//   }, [lossBandingData, baseUrl]);

//   useEffect(() => {
//     if (lossBandingDataYear.length > 0 && selectedYear) {
//       const fetchDataByYear = async () => {
//         try {
//           const numberOfClaimsPromises = lossBandingDataYear.map(async (eachBanding) => {
//             const response = await axios.get(
//               `${baseUrl}/statistics/number_of_claims_by/${selectedYear}?loss_banding=${eachBanding}`
//             );
//             return response.data;
//           });

//           const totalIncurredPromises = lossBandingDataYear.map(async (eachBanding) => {
//             const response = await axios.get(
//               `${baseUrl}/statistics/total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
//             );
//             return response.data;
//           });

//           const numberOfClaims = await Promise.all(numberOfClaimsPromises);
//           const totalIncurred = await Promise.all(totalIncurredPromises);

//           const newData = lossBandingDataYear.map((eachBanding, index) => ({
// 			id:index,
//             'Loss Banding': eachBanding,
//             'Total Incurred': totalIncurred[index].toFixed(2),
//             'Number of Claims': numberOfClaims[index].toFixed(2),
//           }));

//           setDataWithMetricsYear(newData);
//         } catch (err) {
//           console.error(err);
//         }
//       };

//       fetchDataByYear();
//     }
//   }, [baseUrl, lossBandingDataYear, selectedYear]);

//   useEffect(() => {
//     if (lossBandingDataProductLine.length > 0 && selectedMLB1) {
//       const fetchDataByProductLine = async () => {
//         try {
//           const numberOfClaimsPromises = lossBandingDataProductLine.map(async (eachBanding) => {
//             const response = await axios.get(
//               `${baseUrl}/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
//             );
//             return response.data;
//           });

//           const totalIncurredPromises = lossBandingDataProductLine.map(async (eachBanding) => {
//             const response = await axios.get(
//               `${baseUrl}/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
//             );
//             return response.data;
//           });

//           const totalnumberofclaim = await Promise.all(numberOfClaimsPromises);
//           const TotalIncurred = await Promise.all(totalIncurredPromises);

//           const newData = lossBandingDataProductLine.map((eachBanding, index) => ({
//             "Loss Banding": eachBanding,
//             "Total Incurred": TotalIncurred[index].toFixed(2),
//             "Number of Claims": totalnumberofclaim[index].toFixed(2),
//           }));

//           setDataWithMetricsProductLine(newData);
//         } catch (err) {
//           console.error(err);
//         }
//       };

//       fetchDataByProductLine();
//     }
//   }, [lossBandingDataProductLine, selectedMLB1]);

//   return (
//     <>
//       <DashboardBox bgcolor='#fff' gridArea='b3'>
//         <h3>{showTitle}</h3>
//         {selectedYear ? (
//           <DataGrid
//             rows={dataWithMetricsYear}
//             columns={columns}
//             autoHeight={true}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 5,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             disableRowSelectionOnClick
//             sx={{
//               m: 2,
//               mb: 2,
//               border: 0,
//               '& .su-header': {
//                 backgroundColor: 'rgba(118, 211, 255, 0.25)',
//               },
//             }}
//           />
//         ) : selectedMLB1 ? (
//           <DataGrid
//             rows={dataWithMetricsProductLine}
//             columns={columns}
//             autoHeight={true}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 5,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             disableRowSelectionOnClick
//             sx={{
//               m: 2,
//               mb: 2,
//               border: 0,
//               '& .su-header': {
//                 backgroundColor: 'rgba(118, 211, 255, 0.25)',
//               },
//             }}
//           />
//         ) : (
//           <DataGrid
//             rows={dataWithMetrics}
//             columns={columns}
//             autoHeight={true}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 5,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             disableRowSelectionOnClick
//             sx={{
//               m: 2,
//               mb: 2,
//               border: 0,
//               '& .su-header': {
//                 backgroundColor: 'rgba(118, 211, 255, 0.25)',
//               },
//             }}
//           />
//         )}
//       </DashboardBox>
//     </>
//   );
// }

// export default TableBox3;


////////////////////
import DashboardBox from "@/components/DashboardBox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  {
    field: "Loss Banding",
    headerName: "Loss Banding",
    headerClassName: "su-header",
    type: "string",
    minWidth: 20,
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "Number of Claims",
    headerName: "Number of Claims",
    headerClassName: "su-header",
    type: "number",
    minWidth: 50,
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "Total Incurred",
    headerName: "Total Incurred",
    headerClassName: "su-header",
    type: "number",
    minWidth: 50,
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];

type Props = {};

function TableBox3({}: Props) {
  const [lossBandingData, setLossBandingData] = useState([]);
  const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
  const [lossBandingDataProductLine, setLossBandingDataProductLine] = useState([]);

  const [dataWithMetrics, setDataWithMetrics] = useState([]);
  const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
  const [dataWithMetricsProductLine, setDataWithMetricsProductLine] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
  const showTitle = selectedYear
    ? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedYear}`
    : selectedMLB1
    ? `Number of Claim Against Total Cost per Claim by Loss Band by ${selectedMLB1}`
    : "Number of Claim Against Total Cost per Claim by Loss Band by All Years";

  useEffect(() => {
    const fetchLossBandingData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/dropdowns/loss_banding_values`
        );
        setLossBandingData(response.data);
      } catch (error) {
        console.error("Error fetching loss banding data:", error);
      }
    };

    fetchLossBandingData();
  }, []);

  useEffect(() => {
    const fetchLossBandingDataByYear = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/statistics/loss_banding_values_by/${selectedYear}`
        );
        setLossBandingDataYear(response.data);
      } catch (error) {
        console.error("Error fetching loss banding data by year:", error);
      }
    };

    if (selectedYear) {
      fetchLossBandingDataByYear();
    }
  }, [selectedYear]);

  useEffect(() => {
    const fetchLossBandingDataByProductLine = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/dropdowns/loss_banding_values_by_product_line?marsh_line_of_business_1=${selectedMLB1}`
        );
        setLossBandingDataProductLine(response.data);
      } catch (error) {
        console.error("Error fetching loss banding data by product line:", error);
      }
    };

    if (selectedMLB1) {
      fetchLossBandingDataByProductLine();
    }
  }, [selectedMLB1]);

  useEffect(() => {
    if (lossBandingData.length > 0) {
      const fetchData = async () => {
        try {
          const totalIncurredPromises = lossBandingData.map(async (eachBanding) => {
            try {
              const response = await axios.get(
                `${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
              );
              return response.data;
            } catch (error) {
              console.error("Error fetching total incurred data:", error);
              return null; // Return null for failed requests
            }
          });

          const numberOfClaimsPromises = lossBandingData.map(async (eachBanding) => {
            try {
              const response = await axios.get(
                `${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
              );
              return response.data;
            } catch (error) {
              console.error("Error fetching number of claims data:", error);
              return null; // Return null for failed requests
            }
          });

          const totalIncurred = await Promise.all(totalIncurredPromises);
          const numberOfClaims = await Promise.all(numberOfClaimsPromises);

          // Filter out null values from failed requests
          const newData = lossBandingData.map((eachBanding, index) => ({
            id: index,
            "Loss Banding": eachBanding,
            "Total Incurred": totalIncurred[index],
            "Number of Claims": numberOfClaims[index],
          }));

          setDataWithMetrics(newData);
        } catch (err) {
          console.error("Error processing data:", err);
        }
      };

      fetchData();
    }
  }, [lossBandingData]);

  useEffect(() => {
    if (lossBandingDataYear.length > 0 && selectedYear) {
      const fetchDataByYear = async () => {
        try {
          const numberOfClaimsPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              try {
                const response = await axios.get(
                  `${baseUrl}/statistics/number_of_claims_by/${selectedYear}?loss_banding=${eachBanding}`
                );
                return response.data;
              } catch (error) {
                console.error("Error fetching number of claims by year data:", error);
                return null; // Return null for failed requests
              }
            }
          );

          const totalIncurredPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              try {
                const response = await axios.get(
                  `${baseUrl}/statistics/total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
                );
                return response.data;
              } catch (error) {
                console.error("Error fetching total incurred by year data:", error);
                return null; // Return null for failed requests
              }
            }
          );

          const numberOfClaims = await Promise.all(numberOfClaimsPromises);
          const totalIncurred = await Promise.all(totalIncurredPromises);

          // Filter out null values from failed requests
          const newData = lossBandingDataYear.map((eachBanding, index) => ({
            id: index,
            "Loss Banding": eachBanding,
            "Total Incurred": totalIncurred[index].toFixed(2),
            "Number of Claims": numberOfClaims[index].toFixed(2),
          }));

          setDataWithMetricsYear(newData);
        } catch (err) {
          console.error("Error processing data by year:", err);
        }
      };

      fetchDataByYear();
    }
  }, [lossBandingDataYear, selectedYear]);

  useEffect(() => {
    if (lossBandingDataProductLine.length > 0 && selectedMLB1) {
      const fetchDataByProductLine = async () => {
        try {
          const numberOfClaimsPromises = lossBandingDataProductLine.map(
            async (eachBanding) => {
              try {
                const response = await axios.get(
                  `${baseUrl}/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
                );
                return response.data;
              } catch (error) {
                console.error("Error fetching number of claims by product line data:", error);
                return null; // Return null for failed requests
              }
            }
          );

          const totalIncurredPromises = lossBandingDataProductLine.map(
            async (eachBanding) => {
              try {
                const response = await axios.get(
                  `${baseUrl}/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=${selectedMLB1}&loss_banding=${eachBanding}`
                );
                return response.data;
              } catch (error) {
                console.error("Error fetching total incurred by product line data:", error);
                return null; // Return null for failed requests
              }
            }
          );

          const totalnumberofclaim = await Promise.all(numberOfClaimsPromises);
          const TotalIncurred = await Promise.all(totalIncurredPromises);

          // Filter out null values from failed requests
          const newData = lossBandingDataProductLine.map((eachBanding, index) => ({
            id: index,
            "Loss Banding": eachBanding,
            "Total Incurred": TotalIncurred[index].toFixed(2),
            "Number of Claims": totalnumberofclaim[index].toFixed(2),
          }));

          setDataWithMetricsProductLine(newData);
        } catch (err) {
          console.error("Error processing data by product line:", err);
        }
      };

      fetchDataByProductLine();
    }
  }, [lossBandingDataProductLine, selectedMLB1]);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b3">
        <h3>{showTitle}</h3>
        {selectedYear ? (
          <DataGrid
            rows={dataWithMetricsYear}
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
              "& .su-header": {
                backgroundColor: "rgba(118, 211, 255, 0.25)",
              },
            }}
          />
        ) : selectedMLB1 ? (
          <DataGrid
            rows={dataWithMetricsProductLine}
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
              "& .su-header": {
                backgroundColor: "rgba(118, 211, 255, 0.25)",
              },
            }}
          />
        ) : (
          <DataGrid
            rows={dataWithMetrics}
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
              "& .su-header": {
                backgroundColor: "rgba(118, 211, 255, 0.25)",
              },
            }}
          />
        )}
      </DashboardBox>
    </>
  );
}

export default TableBox3;
