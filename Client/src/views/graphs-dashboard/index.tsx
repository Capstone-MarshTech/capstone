import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, useMediaQuery } from "@mui/material";
import NavBar from "@/components/navbar/index";
import DashboardBox from "@/components/DashboardBox";
import GraphsBox1 from "@/components/graphs/box1";
import GraphsBox2 from "@/components/graphs/box2";
import GraphsBox3 from "@/components/graphs/box3";
import GraphsBox4 from "@/components/graphs/box4";
import { ClaimsBox } from "@/components/boxes/ClaimsBox";
import { TotalIncurredBox } from "@/components/boxes/TotalIncurredBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { resolvePath } from "react-router-dom";

const gridTemplateLargeScreens = `
't . . . . .'
'a a . . nav nav'
'b c . . . .'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
`;

const gridTemplateSmallScreens = `
't t'
'nav nav'
'a a'
'b c'
'b1 b1'
'b1 b1'
'b1 b1'
'b1 b1'
'b2 b2'
'b2 b2'
'b2 b2'
'b2 b2'
'b3 b3'
'b3 b3'
'b3 b3'
'b3 b3'
'b3 b3'
'b4 b4'
'b4 b4'
'b4 b4'
'b4 b4'
`;

const GraphsDashboard = () => {
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/dropdowns/clients`
        );
        setMenuItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, []);

  console.log(menuItem);
  const isLargeScreen = useMediaQuery("(min-width: 1008px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isLargeScreen
          ? {
              gridTemplateColumns: "repeat (6,  minmax(150px, 1fr))",
              gridTemplateRows: "repeat (15, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      {" "}
      <Box gridArea="t">
        <h1>Year & Size</h1>
        <p>Graph view</p>
      </Box>
      {/* Client Dropdown */}
      <Box gridArea="a">
        Client Name
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Client Name"
            // onChange={handleChange}
          >
            {menuItem.forEach((client) => {
              <MenuItem>{client}</MenuItem>;
            })}
            <MenuItem value={1}>Client One</MenuItem>
            <MenuItem value={2}>Client Two</MenuItem>
            <MenuItem value={3}>Client Three</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box gridArea="nav">
        <NavBar />
      </Box>
      {/* Number of Claims Box */}
      <DashboardBox bgcolor="#fff" gridArea="b">
        <ClaimsBox />
      </DashboardBox>
      {/* Total Incurred DashboardBox */}
      <DashboardBox bgcolor="#fff" gridArea="c">
        <TotalIncurredBox />
      </DashboardBox>
      {/* Bar Charts */}
      <GraphsBox1 />
      <GraphsBox2 />
      <GraphsBox3 />
      <GraphsBox4 />
    </Box>
  );
};

export default GraphsDashboard;
