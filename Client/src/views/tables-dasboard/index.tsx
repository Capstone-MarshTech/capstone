import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, useMediaQuery } from '@mui/material';
import NavBar from '@/components/navbar/index';
import TableBox1 from '@/components/tables/box1';
import TableBox2 from '@/components/tables/box2';
import TableBox3 from '@/components/tables/box3';
import TableBox4 from '@/components/tables/box4';

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

const TablesDashboard = () => {
	const isLargeScreen = useMediaQuery('(min-width: 1008px)');
	return (
		<Box
			width='100%'
			height='100%'
			display='grid'
			gap='1.5rem'
			sx={
				isLargeScreen
					? {
							gridTemplateColumns: 'repeat (6,  minmax(150px, 1fr))',
							gridTemplateRows: 'repeat (15, minmax(20px, 1fr))',
							gridTemplateAreas: gridTemplateLargeScreens,
					  }
					: {
							gridAutoColumns: '1fr',
							gridAutoRows: '80px',
							gridTemplateAreas: gridTemplateSmallScreens,
					  }
			}
		>
			{' '}
			<Box gridArea='t'>
				<h1>Year & Size</h1>
				<p>Tabular view</p>
			</Box>
			{/* Client Dropdown */}
			<Box gridArea='a'>
				<h5>Client Name</h5>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Client Name</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						// value={age}
						label='Client Name'
						// onChange={handleChange}
					>
						<MenuItem value={1}>Client One</MenuItem>
						<MenuItem value={2}>Client Two</MenuItem>
						<MenuItem value={3}>Client Three</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box gridArea='nav'>
				<NavBar />
			</Box>
			{/* Number of Claims Box */}
			<Box bgcolor='#fff' gridArea='b'>
				<h5>NUMBER OF CLAIMS </h5>
				<p>90</p>
			</Box>
			{/* Total Incurred Box */}
			<Box bgcolor='#fff' gridArea='c'>
				<h5>TOTAL INCURRED </h5>
				<p>$2,000,000</p>
			</Box>
			{/* Table Charts */}
			<TableBox1 />
			<TableBox2 />
			<TableBox3 />
			<TableBox4 />
		</Box>
	);
};

export default TablesDashboard;
