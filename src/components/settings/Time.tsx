import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { SettingButton } from ".";
import { setTime } from "../../state/slices/settingsSlice";

export const TimeSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const time = useSelector((state: RootState) => state.settings.time);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:mx-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Time' : 'Zeitform'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value="12h" location="left" selected={time == 12} onClick={() => dispatch(setTime(12))} />
                <SettingButton value="24h" location="right" selected={time == 24} onClick={() => dispatch(setTime(24))} />
            </div>
        </div>
    );
}