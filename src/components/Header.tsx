import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LocationDark, LocationLight, SearchIconDark, SearchIconLight, ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { setQuery } from "../state/slices/querySlice";
import getData, { Data } from '../service/service';
import { toggleTheme } from '../state/slices/settingsSlice';
import { getUserLocation } from '../service/geocode';
import { setWeather } from '../state/slices/weatherSlice';
import { setForecast } from '../state/slices/forecastSlice';
import { setCity } from '../state/slices/citySlice';
import { setLoading } from '../state/slices/loadingSlice';
import { setInputError } from '../state/slices/errorSlice';
import { InputError } from './Effects';


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
    const theme = useSelector((state: RootState) => state.settings.theme);
    const query = useSelector((state: RootState) => state.query.value);
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputError !== '') dispatch(setInputError(''));
        dispatch(setQuery(event.target.value));
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleClick();
    }

    const handleClick = () => {
        if (query === '') {
            dispatch(setInputError('Please provide a location'));
            return;
        }

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
                dispatch(setLoading(false));
                if (inputError !== '') dispatch(setInputError(''));
            })
            .catch(error => {
                dispatch(setInputError(` ${error}`));
                dispatch(setLoading(false));
            })
    }

    return (
        <>
            <div className="flex flex-row w-full lg:w-2/3 h-12 mr-auto bg-component-light dark:bg-component-dark dark:bg-b rounded-xl">
                <input
                    className={`w-full h-full bg-transparent px-4 rounded-xl placeholder:text-slate-600 ${inputError !== '' ? 'border border-red-600' : ''} font-semibold dark:caret-white focus:outline-none`}
                    placeholder="Search for cities..."
                    onChange={handleChange}
                    value={query}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleClick} className='h-full aspect-square rounded-xl p-3 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors'>
                    {theme === 'dark' ? <SearchIconDark /> : <SearchIconLight />}
                </button>
            </div>
            {inputError !== '' && <InputError />}
        </>
    )
}

export const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            <button onClick={() => dispatch(toggleTheme())} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <ThemeLight /> : <ThemeDark />}

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
        dispatch(setLoading(false));
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <LocationDark /> : <LocationLight />}

            </button>
        </div>
    );
}