function CustomTooltip({ payload, label, active }) {
    // console.log("graph2: ", payload)
    if (active) {
        return (
					<>
						<div className='custom-tooltip'>
							<p className='label'>
								Policy Year: <strong>{label}</strong>
							</p>
							<p className='label'>
								Total Incurred:{' '}
								<strong>{`${payload[1].value.toLocaleString('en-GB', {
									style: 'currency',
									currency: 'GBP',
								})}`}</strong>
							</p>
							<p className='label'>
								Largest Claim:{' '}
								<strong>{`${payload[2].value.toLocaleString('en-GB', {
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

export default CustomTooltip