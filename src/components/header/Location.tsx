import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setLoading } from "../../state/slices/loadingSlice";
import { getUserLocation } from "../../service/geocode";
import getData from "../../service/service";
import { setCity } from "../../state/slices/citySlice";
import { setInputError } from "../../state/slices/errorSlice";
import { setForecast } from "../../state/slices/forecastSlice";
import { setWeather } from "../../state/slices/weatherSlice";
import { LocationDark, LocationLight } from "../icons/Icons";

const Location = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);

    const handleClick = async () => {
        dispatch(setLoading(true));

        getUserLocation()
            .then(data => {
                const { longitude, latitude } = data;
                const coords = { lon: longitude, lat: latitude };
                localStorage.setItem('coords', JSON.stringify(coords));

                getData(coords)
                    .then(data => {
                        const { cityData, currentWeather, forecast } = data;

                        dispatch(setWeather(currentWeather));
                        dispatch(setForecast(forecast))
                        dispatch(setCity(cityData));
                        dispatch(setLoading(false));

                    })
            })
            .catch(error => {
                dispatch(setInputError(` ${error}`));
                dispatch(setLoading(false));
            })
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <LocationDark /> : <LocationLight />}

            </button>
        </div>
    );
}

export default Location