import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggleTheme } from "../../state/slices/settingsSlice";
import { ThemeDark, ThemeLight } from "../icons/Icons";

const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={() => dispatch(toggleTheme())} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' ? <ThemeLight /> : <ThemeDark />}

            </button>
        </div>
    );
}
export default ThemeSwitcher