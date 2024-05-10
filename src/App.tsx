import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';
import { CityData, setCity } from './state/slices/citySlice';
import { WeatherData, setWeather } from './state/slices/weatherSlice';
import getData, { Data } from './service/service';
import { setQuery } from './state/slices/querySlice';
import { ForecastData, setForecast } from './state/slices/forecastSlice';
import { getUserLocation } from './service/geocode';
import { Loader } from './components/Effects';
import { toggleLoading } from './state/slices/loadingSlice';

function App(): JSX.Element {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);
    const city = useSelector((state: RootState) => state.city.value.name);

    //onload data fetch 
    useEffect(() => {
        const inialSetup = async () => {
            if (!('query' in localStorage)) {
                const userLocation = await getUserLocation();

                const { cityData, currentWeather, forecast }: Data = await getData({ lon: userLocation.longitude, lat: userLocation.latitude });
                saveData(cityData, currentWeather, forecast);

                localStorage.query = userLocation.city;
            } else {
                const { cityData, currentWeather, forecast }: Data = await getData(localStorage.query);
                saveData(cityData, currentWeather, forecast);
            }

            dispatch(setQuery(''));
            dispatch(toggleLoading());
        }

        const saveData = (cityData: CityData, currentWeather: WeatherData, forecast: ForecastData) => {
            dispatch(setWeather(currentWeather));
            dispatch(setForecast(forecast))
            dispatch(setCity(cityData));
        }

        inialSetup();
    }, []);

    // theme switching
    useEffect(() => {
        (theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }, [theme]);

    // document title
    useEffect(() => {
        document.title = `${city} - Weather`;
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