import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';

import Main from './components';
import Settings from './components/settings';
import Loader from './components/effects/Loader';

import { setInputError } from './state/slices/errorSlice';
import { setLang, setPrevScrollPos, setTime, setUnit } from './state/slices/settingsSlice';

import { getUserLocation } from './service/geocode';
import { getCoords, setCoords } from './service/localStorage';
import getAndSaveData from './service/service';


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
                    return getCoords();
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
                getAndSaveData(location, dispatch)
            } catch (error: any) {
                dispatch(setInputError(`Failed to Load Weather Data: ${error.message}`));
                console.error(error);
            }
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
        <div className='xxl:w-screen bg-bg-light dark:bg-bg-dark'>
            {isLoading && <Loader />}
            <div className='flex flex-col bg-bg-light dark:bg-bg-dark mx-auto p-4 xxl:w-fit gap-4 min-h-screen text-slate-950 dark:text-slate-50 transition-colors'>
                <Main />
                {settings.isVisible && <Settings />}
            </div>
        </div>
    )
}

export default App