import { Box } from '@mui/material';
import { styled } from '@mui/system';

const DashboardBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.light,
	borderRadius: '.5rem',
	boxShadow: '0.15rem 0.15rem 0.25rem 0.1rem rgba(0, 0, 0, .1)',
	// top right bottom left
	padding: '1rem .2rem 1rem 1.5rem',
}));

export default DashboardBox;
