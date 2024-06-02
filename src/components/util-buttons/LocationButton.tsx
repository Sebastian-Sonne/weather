import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { getUserLocation } from "../../service/geocode";
import { setInputError } from "../../state/slices/errorSlice";
import { LocationDark, LocationLight } from "../icons/Icons";
import getAndSaveData from "../../service/service";

const LocationButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settings.theme);

    const handleClick = async () => {
        try {
            const userLocation = await getUserLocation();
            const coords = { lon: userLocation.longitude, lat: userLocation.latitude };
            getAndSaveData(coords, dispatch);
        } catch (error) {
            dispatch(setInputError(` ${error}`));
        }
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <LocationDark /> : <LocationLight />}

            </button>
        </div>
    );
}
export default LocationButton