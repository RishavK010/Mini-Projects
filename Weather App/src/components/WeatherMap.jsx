import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Fix leaflet's default icon path for production builds
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function WeatherMap({ lat, lon, darkMode, city, weather }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [loading, setLoading] = useState(true);

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

            // Add marker with popup
            const marker = L.marker([lat, lon]).addTo(mapInstanceRef.current);
            marker.bindPopup(`<b>${city || 'Location'}</b><br>${weather || ''}`).openPopup();

            mapInstanceRef.current.on('load', () => setLoading(false));
            setTimeout(() => setLoading(false), 1000); // fallback
        } else {
            // Update existing map view and marker
            mapInstanceRef.current.setView([lat, lon], 10);
            mapInstanceRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.setLatLng([lat, lon]);
                    layer.bindPopup(`<b>${city || 'Location'}</b><br>${weather || ''}`);
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
            setLoading(false);
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lon, darkMode, city, weather]);

    return (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-20">
                    <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" aria-label="Loading map"></div>
                </div>
            )}
            <div
                ref={mapRef}
                className="w-full h-full"
                aria-label="Weather map"
                tabIndex={0}
                style={{ background: darkMode ? '#242424' : '#f0f0f0' }}
            />
        </div>
    );
}

export default WeatherMap; 