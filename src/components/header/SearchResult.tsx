import { useDispatch, useSelector } from "react-redux";
import { SearchData, setQuery, setSearchIsVisible } from "../../state/slices/querySlice";
import { RootState } from "../../state/store";
import getAndSaveData from "../../service/service";
import { setInputError } from "../../state/slices/errorSlice";

const SearchResults = (): JSX.Element => {
    const searchResults = useSelector((state: RootState) => state.query.results);
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className="flex flex-col p-2 w-full rounded-lg shadow-lg bg-component-light dark:bg-component-dark">
            {searchResults !== null ?
                <>
                    {searchResults.data.length !== 0 ? searchResults.data.map((data, index) => <SearchResultButton key={index} data={data} index={index} />)
                        : <h1 className='font-semibold text-lg pl-2'>{lang === 'en' ? 'Error: City not found' : 'Fehler: Stadt nicht gefunden'}</h1>
                    }
                </>
                : <h1 className='font-semibold text-lg pl-2'>{lang === 'en' ? 'Loading...' : 'Laden...'}</h1>
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
        dispatch(setSearchIsVisible(false));

        getAndSaveData({ lon: cityData.longitude, lat: cityData.latitude}, dispatch)
            .then(() => {
                dispatch(setQuery(''));
                if (inputError !== '') dispatch(setInputError(''));
            })
            .catch(() => {
                dispatch(setInputError('Failed to fetch weather data.'));
            })
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