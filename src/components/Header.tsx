import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { setQuery } from "../state/slices/querySlice";
import { setWeather } from '../state/slices/weatherSlice';
import { setCity } from '../state/slices/citySlice';
import getData, { Data } from '../service/service';
import { toggleTheme } from '../state/slices/settingsSlice';


const Header = (): JSX.Element => {

    return (
        <div className="flex flex-row justify-between w-full">
            <SearchBar />
            <ThemeSwitcher />
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
            localStorage.query = query.toLowerCase();
            const { cityData, weatherData }: Data = await getData(query);
        
            dispatch(setWeather(weatherData));
            dispatch(setCity(cityData));
            dispatch(setQuery(''));
        }
    }

    //! HANDLE ERRORS && FETCH ERRORS

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