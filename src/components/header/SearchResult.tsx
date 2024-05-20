import { useDispatch, useSelector } from "react-redux";
import { SearchData, setQuery, setSearchIsVisible } from "../../state/slices/querySlice";
import { RootState } from "../../state/store";
import { setLoading } from "../../state/slices/loadingSlice";
import getData from "../../service/service";
import { setWeather } from "../../state/slices/weatherSlice";
import { setForecast } from "../../state/slices/forecastSlice";
import { setCity } from "../../state/slices/citySlice";
import { setInputError } from "../../state/slices/errorSlice";

const SearchResults = (): JSX.Element => {
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const searchResults = useSelector((state: RootState) => state.query.results);
    const dispatch = useDispatch();

    const handleClick = (cityData: SearchData) => {
        const { longitude, latitude } = cityData;
        const coords = { lon: longitude, lat: latitude };
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
                searchResults.data.map((data, index) => (
                    <button key={index} onClick={() => handleClick(data)} className="flex flex-row gap-4 justify-between items-left h-12 px-4 py-2 rounded-lg hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
                        <h3 className='font-semibold text-lg text-secondary-l dark:text-secondary-d'>{index + 1}</h3>
                        <div className='flex flex-row w-full'>
                            <h1 className='font-semibold text-lg'>{data.name}</h1>
                            <h2 className='font-semibold text-lg text-secondary-l dark:text-secondary-d'>, {data.country}</h2>
                        </div>
                    </button>
                ))
                :
                <h1 className='font-semibold text-lg pl-2'>Loading...</h1>
            }
        </div>
    );
};

export default SearchResults