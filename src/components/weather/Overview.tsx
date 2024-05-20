import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const Overview = (): JSX.Element => {
    const city = useSelector((state: RootState) => state.city.value);
    const weather = useSelector((state: RootState) => state.weather.value);
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className="flex flex-row w-full h-[200px] sm:h-[300px] sm:p-4 rounded-2xl overflow-x-hidden">
            <div className="flex flex-col w-1/2 md:w-2/3 mr-auto py-4 px-2 lg:px-6">

                <div className="h-full gap-4">
                    <h1 className="font-bold text-primary-l dark:text-primary-d text-5xl mb-2">
                        <span className="truncate">
                            {(city.local_names !== undefined) && (city.local_names[lang] !== undefined) ? city.local_names[lang] : city.name}
                            <span className="font-bold text-secondary-l dark:text-secondary-d text-2xl">
                                , {city.country}
                            </span>
                        </span>
                    </h1>
                    <h2 className="font-semibold text-secondary-l dark:text-secondary-d">{weather.weather[0].description}</h2>
                </div>

                <div className="pb-2">
                    <h2 className="font-bold dark:text-primary-d text-7xl">{parseFloat(weather.main.temp).toFixed()}°</h2>
                </div>
            </div>

            <div className="flex items-center h-full aspect-square py-4 px-6">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather icon" />
            </div>
        </div>
    );
}
export default Overview