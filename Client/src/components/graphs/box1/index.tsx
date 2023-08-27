import DashboardBox from '@/components/DashboardBox';
import React, { PureComponent } from 'react';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

// Mock Data
const data = [
	{
		name: '2016',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: '2017',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: '2018',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: '2019',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: '2020',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},

];

type Props = {};

function GraphsBox1({}: Props) {
	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				Number of Claims by Policy Year
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 15,
							right: 25,
							left: -10,
							bottom: 60,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='pv' stackId='a' fill='#002c77' />
						<Bar dataKey='amt' stackId='a' fill='#76d3ff' />
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
}

export default GraphsBox1;
