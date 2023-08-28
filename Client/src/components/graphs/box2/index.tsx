import DashboardBox from '@/components/DashboardBox';

import {
	ComposedChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Line,
  } from "recharts";
  
  const data = [
	{
	  name: "Page A",
	  uv: 4000,
	  pv: 2400,
	  amt: 2400
	},
	{
	  name: "Page B",
	  uv: 3000,
	  pv: 1398,
	  amt: 2210
	},
	{
	  name: "Page C",
	  uv: 2000,
	  pv: 9800,
	  amt: 2290
	},
	{
	  name: "Page D",
	  uv: 2780,
	  pv: 3908,
	  amt: 2000
	},
	{
	  name: "Page E",
	  uv: 1890,
	  pv: 4800,
	  amt: 2181
	},
	{
	  name: "Page F",
	  uv: 2390,
	  pv: 3800,
	  amt: 2500
	},
	{
	  name: "Page G",
	  uv: 3490,
	  pv: 4300,
	  amt: 2100
	}
  ];

type Props = {};

function GraphsBox2({}: Props) {
	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b2'>
				Total Incurred by Policy Year
				<ResponsiveContainer width='100%' height='90%'>
					<ComposedChart
						width={200}
						height={400}
						data={data}
						margin={{
							top: 20,
							right: 20,
							left: 20,
							bottom: 20
						}}
						>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="pv" stackId="a" fill="#002c77" />
						<Bar dataKey="amt" stackId="a" fill="#76d3ff" />
						<Line type="monotone" dataKey="uv" stroke="#00968F" />
					</ComposedChart>
				</ResponsiveContainer>
				
			</DashboardBox>
		</>
	);
}

export default GraphsBox2;
