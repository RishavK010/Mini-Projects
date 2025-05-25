import { useState, useEffect, Suspense, useCallback } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import WeatherMap from "./WeatherMap";
import { useFavorites } from "../hooks/useFavorites";
import { useWeatherCache, useProgressiveLoading } from "../hooks/useWeatherCache";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorBoundary from "./ErrorBoundary";
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from "react-icons/wi";
import DynamicBackground from './DynamicBackground';
import WeatherTabs from './WeatherTabs';

const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "bcdb8eefeb536e3abe5adc43e5776c0e";

const getWeatherIcon = (condition) => {
    if (condition.includes('clear')) return WiDaySunny;
    if (condition.includes('rain')) return WiRain;
    if (condition.includes('snow')) return WiSnow;
    if (condition.includes('cloud')) return WiCloudy;
    if (condition.includes('thunder')) return WiThunderstorm;
    return WiDaySunny;
};

function WeatherApp() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [hourlyData, setHourlyData] = useState(null);
    const [weeklyData, setWeeklyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { getCachedData, setCachedData } = useWeatherCache();
    const visibleForecast = useProgressiveLoading(forecastData);

    // Format temperature
    const formatTemp = useCallback((tempCelsius) => {
        if (tempCelsius == null) return "—";
        return `${Math.round(tempCelsius)}°C`;
    }, []);

    useEffect(() => {
        // Get user's location on first load
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    if (favorites.length > 0) {
                        const lastCity = favorites[favorites.length - 1];
                        fetchWeatherByCoords(lastCity.lat, lastCity.lon);
                    } else {
                        fetchWeather("London");
                    }
                }
            );
        }
    }, []);

    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        setError("");

        const cacheKey = `weather_${lat}_${lon}`;
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
            setWeatherData(cachedData.weather);
            setForecastData(cachedData.forecast);
            setHourlyData(cachedData.hourly);
            setWeeklyData(cachedData.weekly);
            setLoading(false);
            return;
        }

        try {
            const [weatherResponse, forecastResponse] = await Promise.all([
                fetch(`${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
                fetch(`${API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            ]);

            if (!weatherResponse.ok || !forecastResponse.ok) throw new Error("Error fetching weather data");

            const weatherJson = await weatherResponse.json();
            const forecastJson = await forecastResponse.json();

            const weatherData = {
                city: weatherJson.name,
                weather: weatherJson.weather[0].description,
                icon: getWeatherIcon(weatherJson.weather[0].description.toLowerCase()),
                temp: weatherJson.main.temp,
                feelsLike: weatherJson.main.feels_like,
                tempMin: weatherJson.main.temp_min,
                tempMax: weatherJson.main.temp_max,
                humidity: weatherJson.main.humidity,
                windSpeed: weatherJson.wind.speed,
                pressure: weatherJson.main.pressure,
                visibility: weatherJson.visibility,
                sunrise: weatherJson.sys.sunrise,
                sunset: weatherJson.sys.sunset,
                timezone: weatherJson.timezone,
                date: new Date().toLocaleString(),
                coords: {
                    lat: weatherJson.coord.lat,
                    lon: weatherJson.coord.lon
                }
            };

            const processedForecast = forecastJson.list.map(item => ({
                ...item,
                main: {
                    ...item.main,
                    temp: item.main.temp,
                    feels_like: item.main.feels_like,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max
                },
                wind: {
                    ...item.wind,
                    speed: item.wind.speed
                },
                pop: item.pop || 0
            }));

            const hourlyData = processedForecast.slice(0, 8);

            const dailyMap = new Map();
            processedForecast.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                if (!dailyMap.has(date)) {
                    dailyMap.set(date, item);
                }
            });
            const weeklyData = Array.from(dailyMap.values());

            setWeatherData(weatherData);
            setHourlyData(hourlyData);
            setForecastData(weeklyData);
            setWeeklyData(weeklyData);

            setCachedData(cacheKey, {
                weather: weatherData,
                forecast: weeklyData,
                hourly: hourlyData,
                weekly: weeklyData
            });
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleSearch = (query) => {
        if (typeof query === 'object' && query.lat && query.lon) {
            fetchWeatherByCoords(query.lat, query.lon);
            return;
        }

        if (typeof query === 'string' && query.includes(',')) {
            const [lat, lon] = query.split(',').map(coord => parseFloat(coord.trim()));
            if (!isNaN(lat) && !isNaN(lon)) {
                fetchWeatherByCoords(lat, lon);
                return;
            }
        }

        fetchWeather(query);
    };

    const fetchWeather = async (city) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
            if (!response.ok) throw new Error("Invalid city");
            const jsonRes = await response.json();
            await fetchWeatherByCoords(jsonRes.coord.lat, jsonRes.coord.lon);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleFavorite = (cityName) => {
        if (isFavorite(cityName)) {
            removeFavorite(cityName);
        } else if (weatherData) {
            addFavorite({
                name: cityName,
                lat: weatherData.coords.lat,
                lon: weatherData.coords.lon
            });
        }
    };

    return (
        <ErrorBoundary>
            <DynamicBackground weather={weatherData?.weather} isDark={darkMode}>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-end gap-4 mb-6">
                        <button
                            onClick={() => setDarkMode(prev => !prev)}
                            className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
                        >
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-600/80 backdrop-blur-md text-white p-4 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <SearchBar 
                        onSearch={handleSearch} 
                        favorites={favorites} 
                        onToggleFavorite={handleToggleFavorite}
                    />

                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="weather-transition fade-in">
                                    <WeatherCard
                                        data={weatherData}
                                        formatTemp={formatTemp}
                                        onFavorite={handleToggleFavorite}
                                        isFavorite={weatherData ? isFavorite(weatherData.city) : false}
                                    />
                                </div>
                                
                                {weatherData && (
                                    <div className="weather-transition fade-in-delay-1">
                                        <WeatherMap
                                            lat={weatherData.coords.lat}
                                            lon={weatherData.coords.lon}
                                            darkMode={darkMode}
                                        />
                                    </div>
                                )}
                            </div>

                            {weatherData && (
                                <div className="weather-transition fade-in-delay-2">
                                    <WeatherTabs 
                                        hourlyData={hourlyData}
                                        weeklyData={weeklyData}
                                        formatTemp={formatTemp}
                                        darkMode={darkMode}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DynamicBackground>
        </ErrorBoundary>
    );
}

export default WeatherApp;