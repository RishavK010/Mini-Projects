import { motion } from "framer-motion";
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from "react-icons/wi";

const getWeatherIcon = (condition) => {
    if (condition.includes('clear')) return WiDaySunny;
    if (condition.includes('rain')) return WiRain;
    if (condition.includes('snow')) return WiSnow;
    if (condition.includes('cloud')) return WiCloudy;
    if (condition.includes('thunder')) return WiThunderstorm;
    return WiDaySunny;
};

function getWeatherEmoji(description) {
    const d = description.toLowerCase();
    if (d.includes('rain')) return '🌧️';
    if (d.includes('cloud')) return '☁️';
    if (d.includes('clear')) return '☀️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('thunder')) return '⛈️';
    return '⛅';
}

function ForecastCard({ data, darkMode }) {
    if (!data) return null;

    const date = new Date(data.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const Icon = getWeatherIcon(data.weather[0].description.toLowerCase());
    const emoji = getWeatherEmoji(data.weather[0].description);

    // Ensure we have distinct min and max temperatures
    const temp = Math.round(data.main.temp);
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
            className={`${
                darkMode 
                    ? 'bg-slate-800/40 hover:bg-slate-800/60' 
                    : 'bg-white/40 hover:bg-white/60'
            } backdrop-blur-lg rounded-xl p-4 shadow-lg border ${
                darkMode ? 'border-slate-700/50' : 'border-white/50'
            } transition-all duration-300 cursor-pointer`}
        >
            <div className="text-center">
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {dayName}
                </h3>
                <div className="text-3xl mb-1">{emoji}</div>
                <Icon className={`text-4xl mx-auto mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {temp}°C
                </p>
                <p className={`text-sm capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {data.weather[0].description}
                </p>
                <div className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p>
                        H: {tempMax}°C L: {tempMin}°C
                    </p>
                    <p className="mt-1">
                        Humidity: {data.main.humidity}%
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default ForecastCard; 