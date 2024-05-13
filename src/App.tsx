import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';
import { CityData, setCity } from './state/slices/citySlice';
import { WeatherData, setWeather } from './state/slices/weatherSlice';
import getData, { Data } from './service/service';
import { ForecastData, setForecast } from './state/slices/forecastSlice';
import { getUserLocation } from './service/geocode';
import { Loader } from './components/Effects';
import { toggleLoading } from './state/slices/loadingSlice';

function App(): JSX.Element {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);
    const city = useSelector((state: RootState) => state.city.value.name);
    const iconNum = useSelector((state: RootState) => state.weather.value.weather[0].icon);

    //onload data fetch 
    useEffect(() => {
        interface LocationData {
            lon: number;
            lat: number;
        }
        //get initial location
        const getInitialLocation = async (): Promise<LocationData | string> => {
            if ('coords' in localStorage) {
                return JSON.parse(localStorage.coords);
            } else {
                try {
                    const data = await getUserLocation();
                    return { lon: data.longitude, lat: data.latitude };
                } catch (error) {
                    return 'berlin'; //* default location
                }
            }
        }

        //initial weather data fetch
        const initialSetup = async () => {
            try {
                const location = await getInitialLocation();
                const { cityData, currentWeather, forecast }: Data = await getData(location);
                saveData(cityData, currentWeather, forecast);
            } catch (error) {
                //! @me handle error
                console.error(error);
            }

            dispatch(toggleLoading());
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

    return (
        <>
            <Loader />
            <div className='flex flex-row bg-bg-light dark:bg-bg-dark p-4 w-screen gap-6 text-slate-950 dark:text-slate-50 transition-colors'>
                <Main />
            </div>
        </>
    )
}

export default App