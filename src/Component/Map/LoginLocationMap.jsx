import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const LoginLocationMap = ({ locations }) => {
  // Calculate center of all points
  const calculateCenter = () => {
    if (locations.length === 0) return [0, 0];
    
    let latSum = 0;
    let lngSum = 0;
    
    locations.forEach(loc => {
      latSum += loc.coordinates[0];
      lngSum += loc.coordinates[1];
    });
    
    return [latSum / locations.length, lngSum / locations.length];
  };

  return (
    <MapContainer 
      center={calculateCenter()} 
      zoom={2} 
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.coordinates}
          icon={L.icon({
            ...L.Icon.Default.prototype.options,
            className: location.current ? 'current-session-marker' : ''
          })}
        >
          <Popup>
            <div className="space-y-1">
              <p className="font-medium">{location.device}</p>
              <p className="text-sm">{location.location}</p>
              <p className="text-xs text-gray-500">{new Date(location.time).toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LoginLocationMap;