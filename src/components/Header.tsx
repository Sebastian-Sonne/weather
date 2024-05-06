import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { toggle } from "../state/slices/themeSlice";
import { setQuerry } from "../state/slices/querySlice";
import { setWeather, WeatherData } from '../state/slices/weatherSlice';
import getCities from '../service/geocode';
import getWeather from '../service/weather';
import { CityData, setCity } from '../state/slices/citySlice';
import getData, { Data } from '../service/service';


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

    const unit = useSelector((state: RootState) => state.settings.value.unit);
    const query = useSelector((state: RootState) => state.query.value);
    const dispatch = useDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuerry(event.target.value));
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            localStorage.query = query.toLowerCase();
            const { cityData, weatherData }: Data = await getData(query);
        
            dispatch(setWeather(weatherData));
            dispatch(setCity(cityData));
            dispatch(setQuerry(''));
        }
    }

    return (
        <div className="w-full lg:w-2/3 h-12 mr-auto bg-secondary-light dark:bg-secondary-dark dark:bg-b rounded-xl">
            <input
                className="w-full h-full bg-transparent px-4 rounded-xl caret-white focus:outline-none"
                placeholder="Search for cities..."
                onChange={handleChange}
                value={query}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.theme.value);
    const dispatch = useDispatch();

    return (
        <div className="bg-secondary-light dark:bg-secondary-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
            <button onClick={() => dispatch(toggle())} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' && <ThemeLight />}
                {theme !== 'dark' && <ThemeDark />}

            </button>
        </div>
    );
}