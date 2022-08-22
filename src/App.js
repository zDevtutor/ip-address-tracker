import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import Map from './components/Map/Map';

function App() {
	const [location, setLocation] = useState('');
	const [locationData, setLocationData] = useState({});
	const [isLoaded, setIsloaded] = useState(false);
	const [error, setError] = useState(null);

	const getLocationHandler = useCallback(location => {
		setLocation(location);
		setIsloaded(false);
	}, []);

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_IPIFY_URL}?apiKey=${process.env.REACT_APP_IPIFY_KEY}&domain=${location}&ipAddress=${location}`
		)
			.then(response => response.json())
			.then(data => setLocationData(() => data))
			.then(() => setIsloaded(true))
			.catch(err => setError(err.message));
	}, [location]);

	return (
		<div className='app'>
			{isLoaded && (
				<>
					<Header
						locationData={locationData}
						onGetLocationData={getLocationHandler}
						error={error}
					/>
					<Map locationData={locationData} />
				</>
			)}
			{!isLoaded && <h1 className='loading'>Is Loading...</h1>}
		</div>
	);
}

export default App;
