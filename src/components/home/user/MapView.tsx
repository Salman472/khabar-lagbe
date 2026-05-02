import L,{ LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

const markerIcon=new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/8587/8587894.png",
  iconSize: [20,20],
  iconAnchor:[10,20]
})
const MapView = ({possition}:{possition:[number,number] | null}) => {
  if(!possition) return null
  console.log(possition);
    return (
       <MapContainer  center={possition as LatLngExpression } zoom={13} scrollWheelZoom={true} className='w-full h-full'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker icon={markerIcon} position={possition}/>
    
  </MapContainer>
    );
};

export default MapView;