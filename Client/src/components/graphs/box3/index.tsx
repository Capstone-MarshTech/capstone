import DashboardBox from '@/components/DashboardBox';

type Props = {};

function GraphsBox3({}: Props) {
	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b3'>
				Total Incurred Against Number of Claims by Loss Band
			</DashboardBox>
		</>
	);
}

export default GraphsBox3;
