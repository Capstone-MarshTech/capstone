import DashboardBox from "@/components/DashboardBox";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "Loss Band",
    headerName: "Loss Band",
    type: "string",
    width: 200,
    editable: true,
  },

  {
    field: "Number of Claims",
    headerName: "Number of Claims",
    type: "number",
    width: 200,
    editable: true,
  },

  {
    field: "Total Incurred",
    headerName: "Total Incurred",
    type: "number",
    width: 200,
    editable: true,
  },
];
type Props = {};

function TableBox3({}: Props) {
  const [lossBandingData, setLossBandingData] = useState([]);
  const [dataWithMetrics, setDataWithMetrics] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

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

  useEffect(() => {
    if (lossBandingData.length > 0) {
      const fetchData = async () => {
        try {
          const totalIncurredPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const numberOfClaimsPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const totalIncurred = await Promise.all(totalIncurredPromises);
          const numberOfClaims = await Promise.all(numberOfClaimsPromises);

          const newData = lossBandingData.map((eachBanding, index) => ({
            id: index,
            "Loss Band": eachBanding,
            "Total Incurred": totalIncurred[index],
            "Number of Claims": numberOfClaims[index],
          }));

          setDataWithMetrics(newData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [lossBandingData]);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b3">
        Total Incurred Against Number of Claims by Loss Band
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
          checkboxSelection
          disableRowSelectionOnClick
        />
      </DashboardBox>
    </>
  );
}

export default TableBox3;
