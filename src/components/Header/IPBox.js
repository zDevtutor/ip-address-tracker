import React from 'react';

import './IPBox.scss';

function IPBox(props) {
	const { ip, location, isp } = props.locationData;

	return (
		<section className='box'>
			<div className='box__address'>
				<h2 className='secondary-heading'>IP Address</h2>
				<h3 className='tertiary-heading'>{ip}</h3>
			</div>
			<div className='box__location'>
				<h2 className='secondary-heading'>Location</h2>
				<h3 className='tertiary-heading'>
					{location.country + ', ' + location.region}
				</h3>
			</div>
			<div className='box__timezone'>
				<h2 className='secondary-heading'>Timezone</h2>
				<h3 className='tertiary-heading'>{location.timezone}</h3>
			</div>
			<div className='box__isp'>
				<h2 className='secondary-heading'>Ips</h2>
				<h3 className='tertiary-heading'>{isp}</h3>
			</div>
		</section>
	);
}

export default IPBox;
