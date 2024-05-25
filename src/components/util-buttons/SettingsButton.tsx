import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggleSettings } from "../../state/slices/settingsSlice";
import { SettingsIconDark, SettingsIconLight } from "../icons/Icons";

const SettingsButton = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleSettings());
    };

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">
                {theme === 'dark' ? <SettingsIconDark /> : <SettingsIconLight />}
            </button>
        </div>
    );
};
export default SettingsButton
