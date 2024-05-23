import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect, useRef } from "react";
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
import Notification from "../effects/Notification";
import { setCoords } from "../../service/localStorage";
import { setPosition } from "../../state/slices/mapSlice";

const SearchBar = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const query = useSelector((state: RootState) => state.query.value);
    const searchResults = useSelector((state: RootState) => state.query.results);
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const searchContainerRef = useRef<HTMLInputElement | null>(null);

    const debouncedGetCityResults = useDebounce((value: string) => {
        getCityResults(value)
            .then(data => dispatch(setSearch(data)))
            .catch(error => {
                console.error(error);
                dispatch(setInputError('Failed to fetch city results.'));
            });
    }, 750);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
        const value = (typeof event === 'string') ? event : event.target.value;
        if (inputError !== '') dispatch(setInputError(''));
        dispatch(setQuery(value));
        dispatch(setSearchIsVisible(value !== ''));

        if (typeof event === 'string') return; //prevent fetch if query has not changed
        dispatch(setSearch(null));

        if (value === '') return; //prevent fetch if no query
        debouncedGetCityResults(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleClick();
    };

    const handleClick = () => {
        if (query === '') {
            dispatch(setSearchIsVisible(false));
            dispatch(setInputError(lang === 'en' ? 'Please provide a location' : 'Bitte gebe einen Ort an'));
            return;
        }
        dispatch(setLoading(true));
        dispatch(setSearchIsVisible(false));

        const param = (searchResults !== null && searchResults.data.length !== 0
            ? ({
                lon: searchResults.data[0].longitude,
                lat: searchResults.data[0].latitude
            })
            : query);
        getData(param)
            .then(data => {
                const { cityData, currentWeather, forecast } = data;
                setCoords({ lon: cityData.lon, lat: cityData.lat });

                dispatch(setWeather(currentWeather));
                dispatch(setForecast(forecast));
                dispatch(setCity(cityData));
                dispatch(setPosition([cityData.lat, cityData.lon]));
                dispatch(setQuery(''));
                inputRef.current?.blur();
                dispatch(setLoading(false));
                if (inputError !== '') dispatch(setInputError(''));
            })
            .catch(error => {
                console.error(error);
                dispatch(setInputError(lang === 'en' ? 'Failed to fetch weather data.' : 'Wetter Daten konnten nicht geladen werden.'));
                dispatch(setLoading(false));
            });
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            dispatch(setSearchIsVisible(false));
            dispatch(setInputError(''));
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleFocus = () => {
        handleChange(query);
    }

    return (
        <div ref={searchContainerRef} className='w-full lg:w-2/3 h-12  rounded-xl'>
            <div className="flex flex-row w-full h-full bg-component-light dark:bg-component-dark rounded-xl">
                <input
                    className={`w-full h-full bg-transparent px-4 rounded-xl focus:border focus:border-blue-600 placeholder:text-slate-600 ${inputError !== '' ? '!border !border-red-600' : ''} font-semibold dark:caret-white focus:outline-none`}
                    placeholder={lang === 'en' ? 'Search for cities...' : 'Nach Stadt suchen...'}
                    onChange={handleChange}
                    value={query}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    ref={inputRef}
                />
                <SearchButton onClick={handleClick} />
            </div>

            <Notification />
        </div>
    );
};

export default SearchBar

type SearchButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);

    return (
        <button onClick={onClick} className='h-full aspect-square rounded-xl p-3 hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors'>
            {theme === 'dark' ? <SearchIconDark /> : <SearchIconLight />}
        </button>
    );
}