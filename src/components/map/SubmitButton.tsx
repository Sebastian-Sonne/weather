import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import getAndSaveData from "../../service/service";
import { setMapIsVisible } from "../../state/slices/mapSlice";
import { setInputError } from "../../state/slices/errorSlice";

const SubmitButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const lang = useSelector((state: RootState) => state.settings.lang);
    const position = useSelector((state: RootState) => state.map.position);
    const [lat, lon] = position;

    const handleClick = () => {
        dispatch(setMapIsVisible(false));

        getAndSaveData({lon, lat}, dispatch)
            .catch(() => {
                dispatch(setInputError(lang === 'en' ? 'Failed to fetch weather data.' : 'Wetter Daten konnten nicht geladen werden.'));
            })
    };

    return (
        <div className="absolute top-24 right-10 z-[450]  bg-component-dark dark:bg-component-light rounded-xl cursor-pointer hover:bg-component-dark-hover dark:hover:bg-component-light-hover transition-colors">
            <button onClick={handleClick} className="text-lg font-bold text-primary-d dark:text-primary-l p-3 rounded-xl">
                Submit
            </button>
        </div>
    );
}
export default SubmitButton