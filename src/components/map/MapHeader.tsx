import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ExitIconDark, ExitIconLight } from "../icons/Icons";
import { setMapIsVisible } from "../../state/slices/mapSlice";

const MapHeader = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-row justify-between items-center h-14 p-2 pb-4">
            <h1 className="font-bold text-xl text-secondary-l dark:text-secondary-d">
                {lang === 'en' ? 'Select a Location' : 'Wähle einen Ort aus'}
            </h1>

            <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
                <button onClick={() => dispatch(setMapIsVisible(false))} className="w-full aspect-square p-3 rounded-xl">

                    {theme === 'dark' ? <ExitIconDark /> : <ExitIconLight />}

                </button>
            </div>
        </div>
    );
}
export default MapHeader