import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setPosition } from '../../state/slices/mapSlice';

const MapComponent: React.FC = () => {
    const API_KEY = process.env.REACT_APP_THUNDERFOREST_API_KEY;
    const theme = useSelector((state: RootState) => state.settings.theme);
    const position = useSelector((state: RootState) => state.map.position);
    const dispatch = useDispatch();

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
            <Marker position={position} />
        );
    };

    return (
        <div className='w-full h-full rounded-lg'>
            <MapContainer
                center={position !== null ? position : [40.7128, -74.0060]}
                zoom={10}
                style={{ height: '100vh', borderRadius: '8px' }}
            >
                <TileLayer
                    url={theme === 'dark'
                        ? `https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${API_KEY}`
                        : `https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${API_KEY}`}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default MapComponent;

/**
 * 
                    url={theme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    
 */