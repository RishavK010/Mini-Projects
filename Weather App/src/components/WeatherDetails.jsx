import { BsThermometer, BsWater, BsSunrise, BsSunset, BsWind } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function WeatherDetails({ data, darkMode }) {
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
                <div className={`${
                    darkMode 
                        ? 'bg-slate-700/40 hover:bg-slate-700/60' 
                        : 'bg-white/40 hover:bg-white/60'
                } backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:scale-105 border ${
                    darkMode ? 'border-slate-600/50' : 'border-white/50'
                }`}>
                    <div className="flex items-center gap-x-2">
                        <BsThermometer className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                            Feels Like: {Math.round(data.feelsLike)}°C
                        </p>
                    </div>
                </div>
                
                <div className={`${
                    darkMode 
                        ? 'bg-slate-700/40 hover:bg-slate-700/60' 
                        : 'bg-white/40 hover:bg-white/60'
                } backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:scale-105 border ${
                    darkMode ? 'border-slate-600/50' : 'border-white/50'
                }`}>
                    <div className="flex items-center gap-x-2">
                        <BsWater className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                            Humidity: {data.humidity}%
                        </p>
                    </div>
                </div>

                <div className={`${
                    darkMode 
                        ? 'bg-slate-700/40 hover:bg-slate-700/60' 
                        : 'bg-white/40 hover:bg-white/60'
                } backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:scale-105 border ${
                    darkMode ? 'border-slate-600/50' : 'border-white/50'
                }`}>
                    <div className="flex items-center gap-x-2">
                        <BsWind className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                            Wind: {data.windSpeed} km/h
                        </p>
                    </div>
                </div>

                <div className={`${
                    darkMode 
                        ? 'bg-slate-700/40 hover:bg-slate-700/60' 
                        : 'bg-white/40 hover:bg-white/60'
                } backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:scale-105 border ${
                    darkMode ? 'border-slate-600/50' : 'border-white/50'
                }`}>
                    <div className="flex items-center gap-x-2">
                        <BsSunrise className={`text-2xl ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                            Sunrise: {formatTime(data.sunrise)}
                        </p>
                    </div>
                </div>

                <div className={`${
                    darkMode 
                        ? 'bg-slate-700/40 hover:bg-slate-700/60' 
                        : 'bg-white/40 hover:bg-white/60'
                } backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:scale-105 border ${
                    darkMode ? 'border-slate-600/50' : 'border-white/50'
                }`}>
                    <div className="flex items-center gap-x-2">
                        <BsSunset className={`text-2xl ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                            Sunset: {formatTime(data.sunset)}
                        </p>
                    </div>
                </div>

                <div className={`${
                    darkMode 
                        ? 'bg-slate-700/40 hover:bg-slate-700/60' 
                        : 'bg-white/40 hover:bg-white/60'
                } backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:scale-105 border ${
                    darkMode ? 'border-slate-600/50' : 'border-white/50'
                }`}>
                    <div className="flex flex-col">
                        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Temperature Range</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Min: {Math.round(data.tempMin)}°C
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Max: {Math.round(data.tempMax)}°C
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
