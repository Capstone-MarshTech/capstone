
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


type Props = {};

const NavBar = (props: Props) => {
  const { palette } = useTheme();
	const [selected, setSelected] = useState('graph-view');
	return (
		<FlexBetween mt='.25rem' p='.3rem 0rem' color={palette.primary[500]}>
			<FlexBetween gap='2rem'>
				<Box sx={{ '&:hover': { color: palette.primary[100] } }}>
					<FileDownloadIcon
						sx={{ fontSize: '24px', verticalAlign: 'text-bottom' }}
					/>
					<span>Download</span>
				</Box>
				{/* Filter */}
				<Box sx={{ '&:hover': { color: palette.primary[100] } }}>
					<TuneIcon sx={{ fontSize: '24px', verticalAlign: 'text-bottom' }} />
					<span>Filters</span>
				</Box>

				<Box sx={{ '&:hover': { color: palette.primary[100] } }}>
					<Link
						to='/'
						onClick={() => setSelected('graph-view')}
						style={{
							color: selected === 'graph-view' ? 'inherit' : palette.grey[700],
							textDecoration: 'inherit',
						}}
					>
						<BarChartIcon sx={{ fontSize: '24px' }} />
					</Link>
				</Box>
				<Box sx={{ '&:hover': { color: palette.primary[100] } }}>
					<Link
						to='/table-view'
						onClick={() => setSelected('table-view')}
						style={{
							color: selected === 'table-view' ? 'inherit' : palette.grey[700],
							textDecoration: 'inherit',
						}}
					>
						<TableChartIcon sx={{ fontSize: '24px' }} />
					</Link>
				</Box>
			</FlexBetween>
		</FlexBetween>
	);
};

export default NavBar;
