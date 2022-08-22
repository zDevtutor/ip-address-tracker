import React from 'react';

import IPForm from './IPForm';

import './Header.scss';
import IPBox from './IPBox';

function Header(props) {
	return (
		<header className='header'>
			<h1 className='primary-heading'>IP Address Tracker</h1>
			<IPForm onGetLocation={props.onGetLocationData} />
			<IPBox locationData={props.locationData} />
		</header>
	);
}

export default Header;
