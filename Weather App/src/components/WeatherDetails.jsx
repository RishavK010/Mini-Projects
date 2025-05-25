import { BsThermometer, BsWater, BsSunrise, BsSunset, BsWind } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function WeatherDetails({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    if (!data) return null;

    return (
        <div className={`mt-6 space-y-4 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center gap-x-2">
                        <BsThermometer className="text-2xl" />
                        <p>Feels Like: {Math.round(data.feelsLike)}°C</p>
                    </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center gap-x-2">
                        <BsWater className="text-2xl" />
                        <p>Humidity: {data.humidity}%</p>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center gap-x-2">
                        <BsWind className="text-xl" />
                        <p>Wind: {data.windSpeed} km/h</p>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center gap-x-2">
                        <BsSunrise className="text-2xl text-yellow-400" />
                        <p>Sunrise: {formatTime(data.sunrise)}</p>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center gap-x-2">
                        <BsSunset className="text-2xl text-orange-400" />
                        <p>Sunset: {formatTime(data.sunset)}</p>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex flex-col">
                        <p>Temperature Range</p>
                        <p className="text-sm">Min: {Math.round(data.tempMin)}°C</p>
                        <p className="text-sm">Max: {Math.round(data.tempMax)}°C</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
