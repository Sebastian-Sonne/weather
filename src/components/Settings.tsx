import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setTheme, setTime, setUnit } from "../state/slices/settingsSlice";

const Settings = (): JSX.Element => {

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7 max-w-[2000px]">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-2">SETTINGS</h2>

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

export const ThemeSettings = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:ml-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">Theme</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="Dark" location="left" selected={theme === 'dark'} onClick={() => dispatch(setTheme('dark'))} />
                <SettingButton value="Light" location="right" selected={theme !== 'dark'} onClick={() => dispatch(setTheme('light'))} />
            </div>
        </div>
    );
}

export const UnitSettings = (): JSX.Element => {
    const unit = useSelector((state: RootState) => state.settings.unit);
    const dispatch = useDispatch();

    //! refresh on change

    return (
        <div className="flex flex-col gap-4 xl:mr-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">Unit</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="Celcius" location="left" selected={unit === 'metric'} onClick={() => dispatch(setUnit('metric'))} />
                <SettingButton value="Farenheit" location="center" selected={unit === 'imperial'} onClick={() => dispatch(setUnit('imperial'))} />
                <SettingButton value="Kelvin" location="right" selected={unit === 'standard'} onClick={() => dispatch(setUnit('standard'))} />
            </div>
        </div>
    );
}

export const LanguageSettings = (): JSX.Element => {

    return (
        <div className="flex flex-col gap-4 xl:mx-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">Language</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="Englisch" location="left" />
                <SettingButton value="German" location="right" />
            </div>
        </div>
    );
}

export const TimeSettings = (): JSX.Element => {
    const time = useSelector((state: RootState) => state.settings.time);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:mx-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">Time</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="12h" location="left" selected={time == 12} onClick={() => dispatch(setTime(12))} />
                <SettingButton value="24h" location="right" selected={time == 24} onClick={() => dispatch(setTime(24))} />
            </div>
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
    const borderClass = `border-2 ${selected ? 'border-white' : 'border-secondary-l dark:border-secondary-d'} ${location === 'left' ? 'rounded-l-lg' : location === 'center' ? 'border-l-0' : 'border-l-0 rounded-r-lg'}`;

    return (
        <button onClick={onClick}
            className={`font-semibold px-4 py-2 w-32 ${selected ? 'bg-white text-black' : 'hover:bg-secondary-l dark:hover:bg-secondary-d'} ${borderClass} transition-colors`}>{value}</button>
    );
}