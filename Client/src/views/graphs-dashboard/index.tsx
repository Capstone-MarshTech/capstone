
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';

type Props = {};

const gridTemplate = `
'a . . .'
'b c . .'
'd d e e'
'd d e e'
'd d e e'
'd d e e'
'f f g g'
'f f g g'
'f f g g'
'f f g g'
`;

const GraphsDashboard = (props: Props) => {
	// const { palette } = useTheme();
	return (
		<Box
			width='100%'
			height='100%'
			display='grid'
			gap='1.5rem'
			sx={{
				gridTemplateColumns: 'repeat (4,  minmax(370px, 1fr))',
				gridTemplateRows: 'repeat (10, minmax(60px, 1fr))',
				gridTemplateAreas: gridTemplate,
			}}
		>
			{' '}
			<h1>Main Dashboard</h1>
			{/* Client Dropdown */}
			<Box gridArea='a'>
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
			{/* Number of Claims Box */}
			<Box bgcolor='#fff' gridArea='b'>
				<h5>Number of claims </h5>
				<p>90</p>
			</Box>
			{/* Total Incurred Box */}
			<Box bgcolor='#fff' gridArea='c'>
				<h5>Total Incurred </h5>
				<p>$2,000,000</p>
			</Box>
			{/* Bar Chart - Number of Claims by Policy Year */}
			<Box bgcolor='#fff' gridArea='d'>
				Number of Claims by Policy Year
			</Box>
			<Box bgcolor='#fff' gridArea='e'>
				Total Incurred by Policy Year
			</Box>
			<Box bgcolor='#fff' gridArea='f'>
				Total Incurred Against Number of Claims by Loss Band
			</Box>
			<Box bgcolor='#fff' gridArea='g'>
				Largest Claim Against Average Cost per Claim by Loss Band
			</Box>
		</Box>
	);
};

export default GraphsDashboard;
