import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useRef } from "react";
import { useDebounce } from "../../hooks/debounce";
import { getCityResults } from "../../service/geocode";
import { setQuery, setSearch, setSearchIsVisible } from "../../state/slices/querySlice";
import { setInputError } from "../../state/slices/errorSlice";
import { setLoading } from "../../state/slices/loadingSlice";
import getData from "../../service/service";
import { setWeather } from "../../state/slices/weatherSlice";
import { setForecast } from "../../state/slices/forecastSlice";
import { setCity } from "../../state/slices/citySlice";
import { SearchIconDark, SearchIconLight } from "../icons/Icons";
import SearchResults from "./SearchResult";
import InputError from "../effects/Error";

const SearchBar = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const query = useSelector((state: RootState) => state.query.value);
    const searchResults = useSelector((state: RootState) => state.query.results);
    const searchIsVisible = useSelector((state: RootState) => state.query.searchIsVisible);
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const debouncedGetCityResults = useDebounce((value: string) => {
        getCityResults(value)
            .then(data => dispatch(setSearch(data)))
            .catch(error => {
                console.error(error);
                dispatch(setInputError('Failed to fetch city results.'));
            });
    }, 750);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (inputError !== '') dispatch(setInputError(''));
        dispatch(setQuery(value));
        dispatch(setSearchIsVisible(value !== ''));
        dispatch(setSearch(null));

        if (value === '') return;
        debouncedGetCityResults(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

        const param = (searchResults !== null && searchResults.data.length !== 0 
                        ? ({ lon: searchResults.data[0].longitude, 
                             lat: searchResults.data[0].latitude })
                        : query);
        getData(param)
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

export default SearchBar