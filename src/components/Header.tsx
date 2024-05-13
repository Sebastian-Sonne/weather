import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LocationDark, LocationLight, ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { setQuery } from "../state/slices/querySlice";
import getData, { Data } from '../service/service';
import { toggleTheme } from '../state/slices/settingsSlice';
import { getUserLocation } from '../service/geocode';
import { setWeather } from '../state/slices/weatherSlice';
import { setForecast } from '../state/slices/forecastSlice';
import { setCity } from '../state/slices/citySlice';
import { setLoading, toggleLoading } from '../state/slices/loadingSlice';
import { setInputError } from '../state/slices/errorSlice';


const Header = (): JSX.Element => {

    return (
        <div className="flex flex-row justify-between w-full">
            <SearchBar />

            <div className='flex flex-r'>
                <Location />
                <ThemeSwitcher />
            </div>
        </div>
    );
}

export default Header

export const SearchBar = (): JSX.Element => {
    const query = useSelector((state: RootState) => state.query.value);
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputError !== '') dispatch(setInputError(''));
        dispatch(setQuery(event.target.value));
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query !== '') {
            dispatch(setLoading(true));

            getData(query)
                .then(data => {
                    const { cityData, currentWeather, forecast } = data;
                    const coords = { lon: cityData.lon, lat: cityData.lat }

                    localStorage.setItem('coords', JSON.stringify(coords));

                    dispatch(setWeather(currentWeather));
                    dispatch(setForecast(forecast))
                    dispatch(setCity(cityData));
                    dispatch(setQuery(''));
                    dispatch(toggleLoading());
                    if (inputError !== '') dispatch(setInputError(''));
                })
                .catch(error => {
                    console.error(error);
                    dispatch(setInputError('Error: City not Found!'));
                    dispatch(toggleLoading());
                })
        }
    }

    return (
        <div className="w-full lg:w-2/3 h-12 mr-auto bg-component-light dark:bg-component-dark dark:bg-b rounded-xl">
            <input
                className={`w-full h-full bg-transparent px-4 rounded-xl placeholder:text-slate-600 ${inputError !== '' ? 'border border-red-600' : ''} font-semibold dark:caret-white focus:outline-none`}
                placeholder="Search for cities..."
                onChange={handleChange}
                value={query}
                onKeyDown={handleKeyDown}
            />
            {inputError !== '' && (
                <div className='relative flex flex-col bg-component-light dark:bg-component-dark px-4 py-1 text-red-600 text-center font-semibold text-xl rounded-lg w-[calc(100vw-32px)] lg:w-full mt-2 shadow-lg'>
                    <span className="inline-block h-min break-words">{inputError}</span>
                    <a href='mailto:hello@sebastian-sonne.com' className='font-semibold text-secondary-l dark:text-secondary-d hover:text-red-600 text-lg'>Report Issue</a>
                </div>
            )}
        </div>
    )
}

export const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            <button onClick={() => dispatch(toggleTheme())} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' && <ThemeLight />}
                {theme !== 'dark' && <ThemeDark />}

            </button>
        </div>
    );
}

export const Location = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);

    const handleClick = async () => {
        dispatch(setLoading(true));
        const userLocation = await getUserLocation();
        const { longitude, latitude } = userLocation;
        const coords = { lon: longitude, lat: latitude };

        const { cityData, currentWeather, forecast }: Data = await getData(coords);

        localStorage.setItem('coords', JSON.stringify(coords));
        dispatch(setWeather(currentWeather));
        dispatch(setForecast(forecast))
        dispatch(setCity(cityData));
        dispatch(toggleLoading());
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <LocationDark /> : <LocationLight />}

            </button>
        </div>
    );
}