import { BsThermometer, BsWater } from "react-icons/bs";

function WeatherDetails({ data }) {
    return (
        <div className="mt-10 space-y-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                    <BsThermometer className="text-2xl" />
                    <p>Feels Like: {Math.round(data.feelsLike)}°C</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <BsWater className="text-2xl" />
                    <p>Humidity: {data.humidity}%</p>
                </div>
            </div>
            <br />
            <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                    <p>Min Temp: {Math.round(data.tempMin)}°C</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <p>Max Temp:{" "}{Math.round(data.tempMax)}°C</p>
                </div>
            </div>
        </div>
    );
}
