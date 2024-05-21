import { useDispatch, useSelector } from "react-redux";
import { SearchData, setQuery, setSearchIsVisible } from "../../state/slices/querySlice";
import { RootState } from "../../state/store";
import { setLoading } from "../../state/slices/loadingSlice";
import getData from "../../service/service";
import { setWeather } from "../../state/slices/weatherSlice";
import { setForecast } from "../../state/slices/forecastSlice";
import { setCity } from "../../state/slices/citySlice";
import { setInputError } from "../../state/slices/errorSlice";
import { setCoords } from "../../service/localStorage";

const SearchResults = (): JSX.Element => {
    const searchResults = useSelector((state: RootState) => state.query.results);

    return (
        <div className="flex flex-col p-2 w-full rounded-lg shadow-lg bg-component-light dark:bg-component-dark">
            {searchResults !== null ?
                <>
                    {searchResults.data.length !== 0 ? searchResults.data.map((data, index) => <SearchResultButton data={data} index={index} />)
                        : <h1 className='font-semibold text-lg pl-2'>Error: City not found</h1>
                    }
                </>
                : <h1 className='font-semibold text-lg pl-2'>Loading...</h1>
            }
        </div>
    );
};
export default SearchResults

export interface SearchButtonProps {
    data: SearchData;
    index: number;
}
export const SearchResultButton: React.FC<SearchButtonProps> = ({ data, index }): JSX.Element => {
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const dispatch = useDispatch();

    const handleClick = (cityData: SearchData) => {
        const { longitude, latitude } = cityData;
        const coords = { lon: longitude, lat: latitude };
        setCoords(coords);

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
        <button key={index} onClick={() => handleClick(data)} className="flex flex-row gap-4 justify-between items-left h-12 px-4 py-2 rounded-lg hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <h3 className='font-semibold text-lg text-secondary-l dark:text-secondary-d'>{index + 1}</h3>
            <div className='flex flex-row w-full'>
                <h1 className='font-semibold text-lg'>{data.name}</h1>
                <h2 className='font-semibold text-lg text-secondary-l dark:text-secondary-d'>, {data.regionCode}, {data.country}</h2>
            </div>
        </button>
    )
}