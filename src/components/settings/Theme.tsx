import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setTheme } from "../../state/slices/settingsSlice";
import SettingButton from "./Switch";

const ThemeSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:ml-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Theme' : 'Design'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="Dark" location="left" selected={theme === 'dark'} onClick={() => dispatch(setTheme('dark'))} />
                <SettingButton value="Light" location="right" selected={theme !== 'dark'} onClick={() => dispatch(setTheme('light'))} />
            </div>
        </div>
    );
}
export default ThemeSettings