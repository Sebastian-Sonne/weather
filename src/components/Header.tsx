import React, { ChangeEvent, MutableRefObject, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LocationDark, LocationLight, SearchIconDark, SearchIconLight, ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { QuerySearchResults, setQuery, setSearch } from "../state/slices/querySlice";
import getData from '../service/service';
import { toggleTheme } from '../state/slices/settingsSlice';
import { getCityResuts, getUserLocation } from '../service/geocode';
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
    const lang = useSelector((state: RootState) => state.settings.lang);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const query = useSelector((state: RootState) => state.query.value);
    const searchResults = useSelector((state: RootState) => state.query.results);
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputError !== '') dispatch(setInputError(''));
        dispatch(setQuery(event.target.value));

        getCityResuts(event.target.value)
            .then(data => {
                dispatch(setSearch(data));
            })
            .catch(error => {
                console.error(error);
                //! create loading error
            });
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleClick();
    }

    const handleClick = () => {
        if (query === '') {
            dispatch(setInputError('Please provide a location'));
            inputRef.current?.blur();
            return;
        }
        inputRef.current?.blur();
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
                    placeholder={lang === 'en' ? 'Search for cities...' : 'Nach Stadt suchen...'}
                    onChange={handleChange}
                    value={query}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <button onClick={handleClick} className='h-full aspect-square rounded-xl p-3 hover:bg-component-light-hover dark:hover:bg-component-light-hover transition-colors'>
                    {theme === 'dark' ? <SearchIconDark /> : <SearchIconLight />}
                </button>
            </div>
            {inputError !== '' && <InputError />}
            {searchResults && <SearchResults />}
        </>
    )
}

export const SearchResults = (): JSX.Element => {
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const searchResults = useSelector((state: RootState) => state.query.results);
    const dispatch = useDispatch();

    const containerClasses = 'flex flex-col gap-2 absolute top-16 mt-2 p-4 w-[calc(100%-32px)] lg:w-[calc(66.66667%-18px)] rounded-lg';
    const containerColors = 'shadow-lg bg-component-light dark:bg-component-dark';
    const buttonClasses = 'flex flex-row justify-between items-center h-12 p-2 rounded-lg';
    const buttonColors = 'hover:bg-component-light-hover dark:hover:bg-component-light-hover transition-colors';

    const handleClick = (cityData: QuerySearchResults) => {
        const { lng: lon, lat } = cityData;
        const coords = { lon: parseFloat(lon), lat: parseFloat(lat) }
        localStorage.setItem('coords', JSON.stringify(coords));

        getData(coords)
            .then(data => {
                const { cityData, currentWeather, forecast } = data;

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
        <div className={`${containerClasses} ${containerColors}`}>
            {searchResults &&
                <>
                    {searchResults.map((data, index) => (
                        <button key={index} onClick={() => handleClick(data)} className={`${buttonClasses} ${buttonColors}`}>
                            <h3>{index + 1}</h3>
                            <h1>{data.toponymName}</h1>
                            <h2>{data.countryName}</h2>
                        </button>
                    ))}
                </>
            }
        </div>
    )
}

export const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-light-hover transition-colors">
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
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-light-hover transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <LocationDark /> : <LocationLight />}

            </button>
        </div>
    );
}