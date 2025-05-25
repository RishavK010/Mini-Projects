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

function ForecastCard({ data }) {
    if (!data) return null;

    const date = new Date(data.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const Icon = getWeatherIcon(data.weather[0].description.toLowerCase());

    // Ensure we have distinct min and max temperatures
    const temp = Math.round(data.main.temp);
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-4 shadow-lg"
        >
            <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">{dayName}</h3>
                <Icon className="text-4xl mx-auto mb-2" />
                <p className="text-2xl font-bold mb-1">
                    {temp}°C
                </p>
                <p className="text-sm capitalize opacity-75">{data.weather[0].description}</p>
                <div className="mt-2 text-sm">
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