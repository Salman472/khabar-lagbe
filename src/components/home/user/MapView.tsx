import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
const MapView = ({possition}:{possition:[number,number] | null}) => {
  if(!possition) return null
    return (
       <MapContainer  center={possition as LatLngExpression } zoom={13} scrollWheelZoom={false} className='w-full h-full'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
  </MapContainer>
    );
};

export default MapView;