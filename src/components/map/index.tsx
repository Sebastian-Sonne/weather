import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./Map";
import { RootState } from "../../state/store";
import { setMapIsVisible } from "../../state/slices/mapSlice";

const MapContainer = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch();

    return (
        
        <div className="flex flex-col p-6 bg-component-light dark:bg-component-dark rounded-lg">
            <div className="flex flex-row justify-between p-2 pb-4">
                <h1 className="font-bold text-md text-secondary-l dark:text-secondary-d mb-4">{lang === 'en' ? 'Select a Location' : 'Wähle einen Ort aus'}</h1>
                <button onClick={() => dispatch(setMapIsVisible(false))}>Exit</button>
            </div>
            <MapComponent />
        </div>
    );
}
export default MapContainer