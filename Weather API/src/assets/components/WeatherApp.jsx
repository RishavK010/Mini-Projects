import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "bcdb8eefeb536e3abe5adc43e5776c0e";

function WeatherApp() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async (city) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
            if (!response.ok) throw new Error("Invalid city");
            const jsonRes = await response.json();
            setWeatherData({
                city: jsonRes.name,
                weather: jsonRes.weather[0].description,
                temp: jsonRes.main.temp,
                feelsLike: jsonRes.main.feels_like,
                tempMin: jsonRes.main.temp_min,
                tempMax: jsonRes.main.temp_max,
                humidity: jsonRes.main.humidity,
                date: new Date().toLocaleString(),
            });
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleSearch = (city) => {
        fetchWeather(city);
    };

    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">
            {error && (
                <div className="bg-red-600 text-white p-4 rounded-full absolute top-8 z-20">
                    {error}
                </div>
            )}
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />
            <div className="flex flex-col items-center gap-6 w-full max-w-[900px]">
                {/* Weather Card */}
                <WeatherCard
                    data={weatherData}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default WeatherApp;