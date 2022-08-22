import React from 'react';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocationIcon from '../../assets/images/icon-location.svg';

import './Map.scss';

function Map(props) {
	const { location } = props.locationData;

	const position = [location.lat, location.lng];

	const getIcon = () => {
		return L.icon({
			iconUrl: LocationIcon,
			iconSize: [46, 56],
			iconAnchor: [23, 56],
			popupAnchor: [0, -56],
		});
	};

	return (
		<MapContainer center={position} zoom={13} className='map'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker icon={getIcon()} position={position}>
				<Popup className='map__popup'>{`${location.country}, ${location.region}, ${location.city}`}</Popup>
			</Marker>
		</MapContainer>
	);
}

export default Map;
