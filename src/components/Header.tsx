import React, {  useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LocationDark, LocationLight, SearchIconDark, SearchIconLight, ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { QueryObjects, setQuery, setSearch, setSearchIsVisible } from "../state/slices/querySlice";
import getData from '../service/service';
import { toggleTheme } from '../state/slices/settingsSlice';
import { getCityResults, getUserLocation } from '../service/geocode';
import { setWeather } from '../state/slices/weatherSlice';
import { setForecast } from '../state/slices/forecastSlice';
import { setCity } from '../state/slices/citySlice';
import { setLoading } from '../state/slices/loadingSlice';
import { setInputError } from '../state/slices/errorSlice';
import { InputError } from './Effects';
import { useDebounce } from '../hooks/debounce';

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
    const lang = useSelector((state: RootState) => state.settings.lang);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const query = useSelector((state: RootState) => state.query.value);
    const searchIsVisible = useSelector((state: RootState) => state.query.searchIsVisible);
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const debouncedGetCityResults = useDebounce((value: string) => {
        getCityResults(value)
            .then(data  => {
                console.log(data);
                dispatch(setSearch(data));
            })
            .catch(error => {
                console.error(error);
                dispatch(setInputError('Failed to fetch city results.'));
            });
    }, 500);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (inputError !== '') dispatch(setInputError(''));
        dispatch(setQuery(value));
        dispatch(setSearchIsVisible(value !== ''));
        dispatch(setSearch(null));

        if (value === '') return;
        debouncedGetCityResults(value);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleClick();
    };

    const handleClick = () => {
        if (query === '') {
            dispatch(setSearchIsVisible(false));
            dispatch(setInputError('Please provide a location'));
            return;
        }
        dispatch(setLoading(true));
        dispatch(setSearchIsVisible(false));

        getData(query)
            .then(data => {
                const { cityData, currentWeather, forecast } = data;
                const coords = { lon: cityData.lon, lat: cityData.lat };

                localStorage.setItem('coords', JSON.stringify(coords));

                dispatch(setWeather(currentWeather));
                dispatch(setForecast(forecast));
                dispatch(setCity(cityData));
                dispatch(setQuery(''));
                inputRef.current?.blur();
                dispatch(setLoading(false));
                if (inputError !== '') dispatch(setInputError(''));
            })
            .catch(error => {
                console.error(error);
                dispatch(setInputError('Failed to fetch weather data.'));
                dispatch(setLoading(false));
            });
    };

    return (
        <div className='w-full lg:w-2/3 h-12 pr-4 rounded-xl'>
            <div className="flex flex-row w-full h-full bg-component-light dark:bg-component-dark rounded-xl">
                <input
                    className={`w-full h-full bg-transparent px-4 rounded-xl focus:border focus:border-blue-600 placeholder:text-slate-600 ${inputError !== '' ? '!border !border-red-600' : ''} font-semibold dark:caret-white focus:outline-none`}
                    placeholder={lang === 'en' ? 'Search for cities...' : 'Nach Stadt suchen...'}
                    onChange={handleChange}
                    value={query}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <button onClick={handleClick} className='h-full aspect-square rounded-xl p-3 hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors'>
                    {theme === 'dark' ? <SearchIconDark /> : <SearchIconLight />}
                </button>
            </div>
            {inputError !== '' && <InputError />}
            {searchIsVisible && <SearchResults />}
        </div>
    );
};

export const SearchResults = (): JSX.Element => {
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const searchResults = useSelector((state: RootState) => state.query.results);
    const dispatch = useDispatch();

    const handleClick = (cityData: QueryObjects) => {
        const { lng: lon, lat } = cityData;
        const coords = { lon: parseFloat(lon), lat: parseFloat(lat) };
        localStorage.setItem('coords', JSON.stringify(coords));

        dispatch(setSearchIsVisible(false));
        dispatch(setLoading(true));

        getData(coords)
            .then(data => {
                const { cityData, currentWeather, forecast } = data;

                dispatch(setWeather(currentWeather));
                dispatch(setForecast(forecast));
                dispatch(setCity(cityData));
                dispatch(setQuery(''));
                dispatch(setLoading(false));
                if (inputError !== '') dispatch(setInputError(''));
            })
            .catch(error => {
                console.error(error);
                dispatch(setInputError('Failed to fetch weather data.'));
                dispatch(setLoading(false));
            });
    };

    return (
        <div className="flex flex-col absolute top-16 mt-2 p-2 w-[calc(100%-32px)] lg:w-[calc(66.66667%-34px)] rounded-lg shadow-lg bg-component-light dark:bg-component-dark">
            {searchResults !== null ?
                searchResults.geonames.map((data, index) => (
                    <button key={index} onClick={() => handleClick(data)} className="flex flex-row gap-4 justify-between items-left h-12 px-4 py-2 rounded-lg hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
                        <h3 className='font-semibold text-lg text-secondary-l dark:text-secondary-d'>{index + 1}</h3>
                        <div className='flex flex-row w-full'>
                            <h1 className='font-semibold text-lg'>{data.toponymName}</h1>
                            <h2 className='font-semibold text-lg text-secondary-l dark:text-secondary-d'>, {data.countryName}</h2>
                        </div>
                    </button>
                ))
                :
                <h1 className='font-semibold text-lg pl-2'>Loading...</h1>
            }
        </div>
    );
};

export const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
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

        getUserLocation()
            .then(data => {
                const { longitude, latitude } = data;
                const coords = { lon: longitude, lat: latitude };
                localStorage.setItem('coords', JSON.stringify(coords));

                getData(coords)
                    .then(data => {
                        const { cityData, currentWeather, forecast } = data;

                        dispatch(setWeather(currentWeather));
                        dispatch(setForecast(forecast))
                        dispatch(setCity(cityData));
                        dispatch(setLoading(false));

                    })
            })
            .catch(error => {
                dispatch(setInputError(` ${error}`));
                dispatch(setLoading(false));
            })
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <LocationDark /> : <LocationLight />}

            </button>
        </div>
    );
}
