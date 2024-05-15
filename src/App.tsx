import { useDispatch, useSelector } from 'react-redux';
import Main, { Settings } from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';
import { CityData, setCity } from './state/slices/citySlice';
import { WeatherData, setWeather } from './state/slices/weatherSlice';
import getData, { Data } from './service/service';
import { ForecastData, setForecast } from './state/slices/forecastSlice';
import { getUserLocation } from './service/geocode';
import { Loader } from './components/Effects';
import { setLoading } from './state/slices/loadingSlice';
import { setInputError } from './state/slices/errorSlice';
import { setPrevScrollPos } from './state/slices/settingsSlice';

function App(): JSX.Element {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);
    const city = useSelector((state: RootState) => state.city.value.name);
    const iconNum = useSelector((state: RootState) => state.weather.value.weather[0].icon);
    const isLoading = useSelector((state: RootState) => state.loading.value);
    const settingsIsVisible = useSelector((state: RootState) => state.settings.isVisible);

    //onload data fetch 
    useEffect(() => {
        interface LocationData {
            lon: number;
            lat: number;
        }
        //get initial location
        const getInitialLocation = async (): Promise<LocationData | string> => {
            if ('coords' in localStorage) {
                try {
                    return JSON.parse(localStorage.coords);
                } catch (error) {
                    return 'berlin'; //* default location if local storage parse error
                }
            } else {
                try {
                    const data = await getUserLocation();
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
        (theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }, [theme]);

    // document title
    useEffect(() => {
        document.title = `${city} - Weather`;

        interface HTMLLinkElementWithFavicon extends HTMLLinkElement { href: string }
        const icon = document.getElementById('favicon') as HTMLLinkElementWithFavicon;
        icon.href = `https://openweathermap.org/img/wn/${iconNum}@4x.png`;
    }, [city]);

    //smooth settings scroll
    useEffect(() => {
        if (settingsIsVisible) {
            dispatch(setPrevScrollPos(window.scrollY));
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [settingsIsVisible])

    return (
        <>
            {isLoading && <Loader />}
            <div className='flex flex-col bg-bg-light dark:bg-bg-dark p-4 w-screen gap-4 text-slate-950 dark:text-slate-50 transition-colors'>
                <Main />
                {settingsIsVisible && <Settings />}
            </div>
        </>
    )
}

export default App