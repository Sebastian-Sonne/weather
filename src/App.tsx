import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';

import Main from './components';
import Settings from './components/settings';

import { setLoading } from './state/slices/loadingSlice';
import { setInputError } from './state/slices/errorSlice';
import { CityData, setCity } from './state/slices/citySlice';
import { WeatherData, setWeather } from './state/slices/weatherSlice';
import { ForecastData, setForecast } from './state/slices/forecastSlice';
import { setLang, setPrevScrollPos, setTime, setUnit } from './state/slices/settingsSlice';

import getData, { Data } from './service/service';
import { getUserLocation } from './service/geocode';
import Loader from './components/effects/Loader';
import { getCoords, setCoords } from './service/localStorage';

function App(): JSX.Element {
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);
    const cityName = useSelector((state: RootState) => state.city.value.name);
    const iconNum = useSelector((state: RootState) => state.weather.value.weather[0].icon);
    const isLoading = useSelector((state: RootState) => state.loading.value);

    //onload data fetch 
    useEffect(() => {
        interface LocationData {
            lon: number;
            lat: number;
        }
        //get initial location
        const getInitialLocation = async (): Promise<LocationData | string> => {
            if (('coords' in localStorage)) {
                try {
                    return getCoords()
                } catch (error) {
                    return 'berlin'; //* default location if local storage parse error
                }
            } else {
                try {
                    const data = await getUserLocation();
                    //set inital values based on certain locations
                    dispatch(setUnit(data.country_code === 'US' ? 'imperial' : 'metric'));
                    dispatch(setTime(data.country_code === 'US' ? 12 : 24));
                    dispatch(setLang(data.country_code === 'DE' ? 'de' : 'en'));
                    setCoords({ lon: data.longitude, lat: data.latitude });
                    return { lon: data.longitude, lat: data.latitude };
                } catch (error) {
                    return 'berlin'; //* default location if error
                }
            }
        }

        //initial weather data fetch
        const initialSetup = async () => {
            try {
                const location = await getInitialLocation();
                const { cityData, currentWeather, forecast }: Data = await getData(location);

                saveData(cityData, currentWeather, forecast);
            } catch (error: any) {
                dispatch(setInputError(`Failed to Load Weather Data: ${error.message}`));
                console.error(error);
            }

            dispatch(setLoading(false));
        }

        const saveData = (cityData: CityData, currentWeather: WeatherData, forecast: ForecastData) => {
            dispatch(setWeather(currentWeather));
            dispatch(setForecast(forecast))
            dispatch(setCity(cityData));
        }

        initialSetup();
    }, []);

    // theme switching
    useEffect(() => {
        (settings.theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }, [settings.theme]);

    // document title
    useEffect(() => {
        document.title = `${cityName} - ${settings.lang === 'de' ? 'Wetter': 'Weather'}`;

        interface HTMLLinkElementWithFavicon extends HTMLLinkElement { href: string }
        const icon = document.getElementById('favicon') as HTMLLinkElementWithFavicon;
        icon.href = `https://openweathermap.org/img/wn/${iconNum}@4x.png`;
    }, [cityName, settings.lang]);

    //smooth settings scroll
    useEffect(() => {
        if (settings.isVisible) {
            dispatch(setPrevScrollPos(window.scrollY));
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [settings.isVisible])

    return (
        <>
            {isLoading && <Loader />}
            <div className='flex flex-col bg-bg-light dark:bg-bg-dark p-4 w-screen gap-4 min-h-screen text-slate-950 dark:text-slate-50 transition-colors'>
                <Main />
                {settings.isVisible && <Settings />}
            </div>
        </>
    )
}

export default App