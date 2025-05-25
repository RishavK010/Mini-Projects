import { motion } from "framer-motion";
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from "react-icons/wi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import WeatherDetails from "./WeatherDetails";

const getWeatherIcon = (weather) => {
    if (!weather) return WiDaySunny;
    const condition = weather.toLowerCase();
    if (condition.includes('clear')) return WiDaySunny;
    if (condition.includes('rain')) return WiRain;
    if (condition.includes('snow')) return WiSnow;
    if (condition.includes('cloud')) return WiCloudy;
    if (condition.includes('thunder')) return WiThunderstorm;
    return WiDaySunny;
};

function WeatherCard({ data, formatTemp, onFavorite, isFavorite }) {
    if (!data) return null;

    const WeatherIcon = getWeatherIcon(data.weather);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-6 w-full shadow-lg relative overflow-hidden"
        >
            {/* Favorite Button */}
            <button
                onClick={() => onFavorite(data.city)}
                className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform z-10"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorite ? (
                    <AiFillHeart className="text-red-500 drop-shadow-lg" />
                ) : (
                    <AiOutlineHeart className="text-white drop-shadow-lg" />
                )}
            </button>

            {/* City and Date */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-1">{data.city}</h2>
                <p className="text-sm opacity-75">{data.date}</p>
            </div>

            {/* Main Weather Display */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <WeatherIcon className="text-6xl mr-4" />
                    <div>
                        <p className="text-4xl font-bold">
                            {formatTemp(data.temp)}
                        </p>
                        <p className="capitalize text-lg">{data.weather}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm">
                        Feels like: {formatTemp(data.feelsLike)}
                    </p>
                    <p className="text-sm">
                        H: {formatTemp(data.tempMax)} L: {formatTemp(data.tempMin)}
                    </p>
                </div>
            </div>

            {/* Weather Details */}
            <WeatherDetails data={data} />
        </motion.div>
    );
}

export default WeatherCard;