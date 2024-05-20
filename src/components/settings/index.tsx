import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggleSettings } from "../../state/slices/settingsSlice";
import { SettingsIconDark, SettingsIconLight } from "../icons/Icons";
import ThemeSettings from "./Theme";
import UnitSettings from "./Unit";
import LanguageSettings from "./Language";
import { TimeSettings } from "./Time";

const Settings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7 max-w-[2000px]">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-2">{lang === 'en' ? 'SETTINGS' : 'EINSTELLUNGEN'}</h2>

            <div className="flex flex-col xl:flex-row xl:justify-between w-full p-2 gap-4">

                <div className="flex flex-col md:flex-row justify-between xl:justify-start xl:gap-4 xl:w-full gap-2">
                    <UnitSettings />
                    <TimeSettings />
                </div>
                <div className="flex flex-col sm:flex-row justify-between xl:justify-start xl:gap-4 xl:w-full gap-2">
                    <LanguageSettings />
                    <ThemeSettings />
                </div>
            </div>
        </div>
    );
}
export default Settings

export const SettingsIcon = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleSettings());
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">
                {theme === 'dark' ? <SettingsIconDark /> : <SettingsIconLight />}
            </button>
        </div>
    );
}

interface SettingButtonProps {
    value: string,
    location: 'left' | 'center' | 'right',
    selected?: boolean,
    onClick?: any,
}
export const SettingButton: React.FC<SettingButtonProps> = ({ value, location, selected, onClick }): JSX.Element => {
    const borderClass = `border-2 ${selected ? 'border-gray-600 dark:border-white' : 'border-secondary-l dark:border-secondary-d'} ${location === 'left' ? 'rounded-l-lg' : location === 'center' ? 'border-l-0' : 'border-l-0 rounded-r-lg'}`;
    const colorClass = `${selected ? 'bg-gray-600 text-white dark:bg-bg-light dark:text-black' : 'hover:bg-icon dark:hover:bg-secondary-d'}`;

    return (
        <button onClick={onClick} disabled={selected} className={`font-semibold px-4 py-2 w-32 ${colorClass} ${borderClass} transition-colors`}>
            {value}
        </button>
    );
}