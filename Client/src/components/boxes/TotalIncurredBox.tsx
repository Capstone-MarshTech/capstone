import { useState, useEffect } from 'react';
import axios from 'axios';

export const TotalIncurredBox = () => {
	const [totalIncurred, setTotalIncurred] = useState(0);
	useEffect(() => {
		const fetchClaims = async () => {
			try {
				const response = await axios.get(
					'http://localhost:1337/metrics/total_incurred'
				);
				setTotalIncurred(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchClaims();
	}, []);
	return (
		<>
			<h6>TOTAL INCURRED</h6>
			<h4>{totalIncurred.toLocaleString("en-GB", { style: "currency", currency: "GBP" })}</h4>
		</>
	);
};
