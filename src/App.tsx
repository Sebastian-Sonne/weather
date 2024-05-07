import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';
import { setCity } from './state/slices/citySlice';
import { setWeather } from './state/slices/weatherSlice';
import getData, { Data } from './service/service';
import { fetchInitialQuery, setQuery } from './state/slices/querySlice';

function App(): JSX.Element {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);
    const city = useSelector((state: RootState) => state.city.value.name);

    //onload data fetch 
    useEffect(() => {
        const inialSetup = async () => {
            fetchInitialQuery();

            const { cityData, weatherData }: Data = await getData(localStorage.query);
    
            dispatch(setWeather(weatherData));
            dispatch(setCity(cityData));
            dispatch(setQuery(''));
        }

        inialSetup();
    }, []);

    // theme switching
    useEffect(() => {
        (theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }, [theme]);

    useEffect(() => {
        document.title = `${city} - Weather`;
    }, [city]);

    return (
        <div className='flex flex-row bg-bg-light dark:bg-bg-dark p-4 w-screen gap-6 text-slate-950 dark:text-slate-50 transition-colors'>
            <Main />
        </div>
    )
}

export default App