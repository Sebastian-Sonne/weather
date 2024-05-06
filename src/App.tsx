import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';
import { setCity } from './state/slices/citySlice';
import { setWeather } from './state/slices/weatherSlice';
import getData, { Data } from './service/service';

function App(): JSX.Element {

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.value);

    //onload 
    useEffect(() => {
        setTheme(theme);
        inialSetup();
    }, []);

    const inialSetup = async () => {
        const { cityData, weatherData }: Data = await getData(localStorage.query)
        
        dispatch(setWeather(weatherData));
        dispatch(setCity(cityData));
    }

    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    const setTheme = (theme: string) => {
        (theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }
    
    //! onload theme does not work

    return (
        <div className='flex flex-row bg-bg-light dark:bg-bg-dark p-4 w-screen gap-6 text-slate-950 dark:text-slate-50 transition-colors'>

            {/* <Sidebar /> */}
            <Main />
        </div>
    )
}

export default App