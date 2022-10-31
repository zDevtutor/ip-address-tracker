import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Map from './components/Map/Map';

function App() {
	const [location, setLocation] = useState('');
	const [locationData, setLocationData] = useState({
		ip: '',
		location: {
			country: '',
			region: '',
			timezone: '',
		},
		isp: '',
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const getLocationHandler = location => {
		setLocation(location);
	};

	useEffect(() => {
		const fetchLocationData = async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_IPIFY_URL}?apiKey=${process.env.REACT_APP_IPIFY_KEY}&domain=${location}&ipAddress=${location}`
				);

				setLocationData(data);
				setIsLoading(false);
				setError(null);
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
			}
		};

		fetchLocationData();
	}, [location]);

	return (
		<>
			<Header
				locationData={locationData}
				onGetLocationData={getLocationHandler}
				error={error}
			/>

			{isLoading && !error ? (
				<h1 className='loading'>Is Loading...</h1>
			) : error ? (
				<h1 className='error'>{error}</h1>
			) : (
				<Map location={locationData} />
			)}
		</>
	);
}

export default App;
