import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setPosition } from '../../state/slices/mapSlice';
import PositionIcon from '../../../public/theme_icons/MarkerIcon.svg';
import SubmitButton from './SubmitButton';
import L from 'leaflet';

const MapComponent: React.FC = () => {
    const API_KEY = process.env.REACT_APP_THUNDERFOREST_API_KEY;
    const theme = useSelector((state: RootState) => state.settings.theme);
    const position = useSelector((state: RootState) => state.map.position);
    const dispatch = useDispatch();

    const customIcon = new L.Icon({
        iconUrl: PositionIcon,
        iconSize: [45, 61], //size [x, y]
        iconAnchor: [22.5, 61], //tip of marker [x, y] from top left
    });

    const LocationMarker: React.FC = () => {
        const map = useMapEvents({
            click(e) {
                dispatch(setPosition([e.latlng.lat, e.latlng.lng]));
            },
        });

        useEffect(() => {
            if (position) {
                map.flyTo(position, map.getZoom());
            }
        }, [position, map]);

        return position === null ? null : (
            <Marker position={position} icon={customIcon} />
        );
    };

    return (
        <div className='w-full h-full border-2 border-secondary-l dark:border-secondary-d rounded-lg'>

            <SubmitButton />

            <MapContainer
                center={position !== null ? position : [40.7128, -74.0060]}
                zoom={10}
                style={{ height: '100%', borderRadius: '8px' }}
            >
                <TileLayer
                    url={theme === 'dark'
                        ? `https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=${API_KEY}`
                        : `https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${API_KEY}`}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default MapComponent;