import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function WeatherMap({ lat, lon, darkMode }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize map if it doesn't exist
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], 10);

            // Add tile layer with conditional styling based on dark mode
            L.tileLayer(
                darkMode
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: darkMode
                        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19,
                }
            ).addTo(mapInstanceRef.current);

            // Add marker
            L.marker([lat, lon]).addTo(mapInstanceRef.current);
        } else {
            // Update existing map view and marker
            mapInstanceRef.current.setView([lat, lon], 10);
            mapInstanceRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.setLatLng([lat, lon]);
                }
                if (layer instanceof L.TileLayer) {
                    // Update tile layer based on dark mode
                    layer.setUrl(
                        darkMode
                            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    );
                }
            });
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lon, darkMode]);

    return (
        <div 
            ref={mapRef} 
            className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
            style={{ background: darkMode ? '#242424' : '#f0f0f0' }}
        />
    );
}

export default WeatherMap; 