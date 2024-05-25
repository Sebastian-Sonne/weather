import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { MapIconDark, MapIconLight } from "../icons/Icons";
import { toggleMapIsVisible } from "../../state/slices/mapSlice";

const MapButton = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();
    
    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={() => dispatch(toggleMapIsVisible())} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <MapIconDark /> : <MapIconLight />}

            </button>
        </div>
    );
}
export default MapButton