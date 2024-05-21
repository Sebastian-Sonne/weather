import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setLoading } from "../../state/slices/loadingSlice";
import { setUnit } from "../../state/slices/settingsSlice";
import getData from "../../service/service";
import { setWeather } from "../../state/slices/weatherSlice";
import { setForecast } from "../../state/slices/forecastSlice";
import { setCity } from "../../state/slices/citySlice";
import { setInputError } from "../../state/slices/errorSlice";
import { SettingButton } from ".";
import { getCoords } from "../../service/localStorage";

const UnitSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const unit = useSelector((state: RootState) => state.settings.unit);
    const dispatch = useDispatch();

    const handleClick = (unit: 'standard' | 'imperial' | 'metric') => {
        dispatch(setUnit(unit));
        dispatch(setLoading(true));

        const { lon, lat } = getCoords();
        getData({ lon: lon, lat: lat })
            .then(data => {
                const { cityData, currentWeather, forecast } = data;
                dispatch(setWeather(currentWeather));
                dispatch(setForecast(forecast));
                dispatch(setCity(cityData));
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(setInputError(` ${error}`));
                dispatch(setLoading(false));
            });
    }

    return (
        <div className="flex flex-col gap-4 xl:mr-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Unit' : 'Einheit'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value={lang === 'en' ? 'Metric' : 'Metrisch'} location="left" selected={unit === 'metric'} onClick={() => handleClick('metric')} />
                <SettingButton value={lang === 'en' ? 'Imperial' : 'Imperial'} location="center" selected={unit === 'imperial'} onClick={() => handleClick('imperial')} />
                <SettingButton value="SI" location="right" selected={unit === 'standard'} onClick={() => handleClick('standard')} />
            </div>
        </div>
    );
}

export default UnitSettings