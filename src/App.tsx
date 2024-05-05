import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';
import fetchLongLat from './service/city';
import getCurrentWeatherData from './service/weather';

function App(): JSX.Element {
    const dispatch = useDispatch();

    const theme = useSelector((state: RootState) => state.theme.value);
    useEffect(() => {
        (theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }, [theme]);

    //! onload theme does not work

    //getCurrentWeatherData({ location:'42.3478,-71.0466 '});

    const query = useSelector((state: RootState) => state.query.value);
    useEffect(() => {
        //const weatherData = getCurrentWeatherData({ q: query });
        //dispatch(setWeather(weatherData));
    }, [query]);

    const test = async() => {
        fetchLongLat({ namePrefix:'Singapore' })
            .then((data) => {
                const params = { location:`${data.long}, ${data.lat}` }

                console.log('cityData:');
                console.log(data);

                getCurrentWeatherData(params)
                    .then((weatherData) => {
                        console.log('WeatherData:');
                        console.log(weatherData);
                    })
            })
    }    


    return (
        <div className='flex flex-row bg-bg-light dark:bg-bg-dark p-4 w-screen gap-6 text-slate-950 dark:text-slate-50 transition-colors'>

            {/* <Sidebar /> */}

            <Main />
        </div>
    )
}

export default App
