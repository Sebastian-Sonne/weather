import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setLang, setTheme, setTime, setUnit } from "../state/slices/settingsSlice";
import getData from "../service/service";
import { setForecast } from "../state/slices/forecastSlice";
import { setWeather } from "../state/slices/weatherSlice";
import { setCity } from "../state/slices/citySlice";
import { setInputError } from "../state/slices/errorSlice";
import { setLoading } from "../state/slices/loadingSlice";

const Settings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7 max-w-[2000px]">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-2">{lang === 'en' ? 'SETTINGS': 'EINSTELLUNGEN'}</h2>

            <div className="flex flex-col xl:flex-row xl:justify-between w-full p-2 gap-4">

                <div className="flex flex-col md:flex-row justify-between xl:justify-start xl:gap-4 xl:w-full gap-2">
                    <UnitSettings />
                    <TimeSettings />
                </div>
                <div className="flex flex-col sm:flex-row justify-between xl:justify-start xl:gap-4 xl:w-full gap-2">
                    <LanguageSettings />
                    <ThemeSettings />
                </div>
            </div>
        </div>
    );
}
export default Settings

export const ThemeSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:ml-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Theme': 'Design'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="Dark" location="left" selected={theme === 'dark'} onClick={() => dispatch(setTheme('dark'))} />
                <SettingButton value="Light" location="right" selected={theme !== 'dark'} onClick={() => dispatch(setTheme('light'))} />
            </div>
        </div>
    );
}

export const UnitSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const unit = useSelector((state: RootState) => state.settings.unit);
    const dispatch = useDispatch();

    const handleClick = (unit: 'standard' | 'imperial' | 'metric') => {
        dispatch(setUnit(unit));
        dispatch(setLoading(true));

        const { lon, lat} = JSON.parse(localStorage.coords);
        getData({ lon: lon, lat: lat})
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
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Unit': 'Einheit'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value={lang === 'en' ? 'Metric': 'Metrisch'} location="left" selected={unit === 'metric'} onClick={() => handleClick('metric')} />
                <SettingButton value={lang === 'en' ? 'Imperial': 'Imperial'} location="center" selected={unit === 'imperial'} onClick={() => handleClick('imperial')} />
                <SettingButton value="SI" location="right" selected={unit === 'standard'} onClick={() => handleClick('standard')} />
            </div>
        </div>
    );
}

export const LanguageSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:mx-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Language': 'Sprache'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value={lang === 'en' ? 'English': 'Englisch'} location="left" selected={lang === 'en'} onClick={() => dispatch(setLang('en'))} />
                <SettingButton value={lang === 'en' ? 'German': 'Deutsch'} location="right" selected={lang === 'de'} onClick={() => dispatch(setLang('de'))} />
            </div>
        </div>
    );
}

export const TimeSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const time = useSelector((state: RootState) => state.settings.time);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:mx-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Time': 'Zeitform'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="12h" location="left" selected={time == 12} onClick={() => dispatch(setTime(12))} />
                <SettingButton value="24h" location="right" selected={time == 24} onClick={() => dispatch(setTime(24))} />
            </div>
        </div>
    );
}

interface SettingButtonProps {
    value: string,
    location: 'left' | 'center' | 'right',
    selected?: boolean,
    onClick?: any,
}
export const SettingButton: React.FC<SettingButtonProps> = ({ value, location, selected, onClick }): JSX.Element => {
    const borderClass = `border-2 ${selected ? 'border-gray-600 dark:border-white' : 'border-secondary-l dark:border-secondary-d'} ${location === 'left' ? 'rounded-l-lg' : location === 'center' ? 'border-l-0' : 'border-l-0 rounded-r-lg'}`;
    const colorClass = `${selected ? 'bg-gray-600 text-white dark:bg-bg-light dark:text-black' : 'hover:bg-icon dark:hover:bg-secondary-d'}`;

    return (
        <button onClick={onClick} disabled={selected} className={`font-semibold px-4 py-2 w-32 ${colorClass} ${borderClass} transition-colors`}>
            {value}
        </button>
    );
}