import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setLoading } from "../../state/slices/loadingSlice";
import getData from "../../service/service";
import { setCoords } from "../../service/localStorage";
import { setWeather } from "../../state/slices/weatherSlice";
import { setForecast } from "../../state/slices/forecastSlice";
import { setCity } from "../../state/slices/citySlice";
import { setMapIsVisible, setPosition } from "../../state/slices/mapSlice";
import { setInputError } from "../../state/slices/errorSlice";

const SubmitButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const lang = useSelector((state: RootState) => state.settings.lang);
    const position = useSelector((state: RootState) => state.map.position);
    const [lat, lon] = position;

    const handleClick = () => {
        dispatch(setMapIsVisible(false));
        dispatch(setLoading(true));
        
        getData({lon, lat})
            .then(data => {
                const { cityData, currentWeather, forecast } = data;
                setCoords({ lon: cityData.lon, lat: cityData.lat });

                dispatch(setWeather(currentWeather));
                dispatch(setForecast(forecast));
                dispatch(setCity(cityData));
                dispatch(setPosition([cityData.lat, cityData.lon]));
                dispatch(setLoading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(setInputError(lang === 'en' ? 'Failed to fetch weather data.' : 'Wetter Daten konnten nicht geladen werden.'));
                dispatch(setLoading(false));
            });
    };

    return (
        <div className="absolute top-24 right-10 z-[450]  bg-component-dark dark:bg-component-light rounded-xl cursor-pointer hover:bg-component-dark-hover dark:hover:bg-component-light-hover transition-colors">
            <button onClick={handleClick} className="text-lg font-bold text-primary-d dark:text-primary-l p-3 rounded-xl">
                Submit
            </button>
        </div>
    );
}
export default SubmitButton