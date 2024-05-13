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
    const dispatch = useDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    dispatch(toggleLoading())
                })
                .catch(error => {
                    
                    //! HANDLE ERROR HERE @me

                    console.log(error);

                    dispatch(toggleLoading());
                })
        }
    }

    //! @me HAND LE ERRORS

    return (
        <div className="w-full lg:w-2/3 h-12 mr-auto bg-component-light dark:bg-component-dark dark:bg-b rounded-xl">
            <input
                className="w-full h-full bg-transparent px-4 rounded-xl placeholder:text-slate-600 font-semibold dark:caret-white focus:outline-none"
                placeholder="Search for cities"
                onChange={handleChange}
                value={query}
                onKeyDown={handleKeyDown}
            />
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