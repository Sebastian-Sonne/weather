import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setMapIsVisible } from "../../state/slices/mapSlice";
import ExitButton from "../util-buttons/ExitButton";

const MapHeader = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-row justify-between items-center h-14 p-2 pb-4">
            <h1 className="font-bold text-xl text-secondary-l dark:text-secondary-d">
                {lang === 'en' ? 'Select a Location' : 'Wähle einen Ort aus'}
            </h1>

            <ExitButton onClick={() => dispatch(setMapIsVisible(false))} />
        </div>
    );
}
export default MapHeader