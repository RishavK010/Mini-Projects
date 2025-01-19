import WeatherDetails from "./WeatherDetails";
import { ImSpinner8 } from "react-icons/im";

function WeatherCard({ data, loading }) {
    if (loading) {
        return (
            <div className="max-w-[700px] bg-black/20 min-h-[584px] text-white rounded-[32px] py-12 px-10 flex justify-center items-center">
                <ImSpinner8 className="text-5xl animate-spin" />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="max-w-[700px] bg-black/20 min-h-[584px] text-white rounded-[32px] py-12 px-10">
            <div className="text-center">
                <h1 className="text-4xl font-semibold">{data.city}</h1>
                <p className="text-[144px] font-light">
                    {Math.round(data.temp)}&deg;C
                </p>
                <p className="text-3xl">{data.weather}</p>
                <p className="text-lg mt-4">{data.date}</p>
            </div>
            <WeatherDetails data={data} />
        </div>
    );
}

export default WeatherCard;