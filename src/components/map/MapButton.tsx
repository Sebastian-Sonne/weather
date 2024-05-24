import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { MapIconDark, MapIconLight } from "../icons/Icons";
import { toggleMapIsVisible } from "../../state/slices/mapSlice";

const MapButton = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const mapIsVisible = useSelector((state: RootState) => state.map.isVisible);
    const dispatch = useDispatch();
    
    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={() => dispatch(toggleMapIsVisible())} disabled={mapIsVisible} className="w-full aspect-square p-2 rounded-xl disabled:cursor-pointer disabled:bg-component-light-hover dark:bg-component-dark-hover ">

                {theme === 'dark' ? <MapIconDark /> : <MapIconLight />}

            </button>
        </div>
    );
}
export default MapButton