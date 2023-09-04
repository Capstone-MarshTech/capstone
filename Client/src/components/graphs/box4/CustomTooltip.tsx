function CustomTooltip({ payload, label, active }) {
	// console.log("graph4: ", payload)
	if (active) {
		return (
			<>
				<div className='custom-tooltip'>
					<p className='label'>
						Loss Band: <strong>{payload[0].payload['Loss Banding']}</strong>
					</p>
					{/* <p className='label'>{`Largest Claim: ${payload[0].payload['Largest Claim']}`}</p> */}
					<p className='label'>
						Largest Claim:{' '}
						<strong>{`${parseFloat(
							payload[0].payload['Largest Claim']
						).toLocaleString('en-GB', {
							style: 'currency',
							currency: 'GBP',
						})}`}</strong>
					</p>
					{/* <p className='label'>{`Average Cost of Claim: ${payload[1].payload['Average Total Incurred']}`}</p> */}
					<p className='label'>
						Average Cost of Claim:{' '}
						<strong>{`${parseFloat(
							payload[1].payload['Average Total Incurred']
						).toLocaleString('en-GB', {
							style: 'currency',
							currency: 'GBP',
						})}`}</strong>
					</p>
				</div>
			</>
		);
	}
	return null;
}

export default CustomTooltip;
