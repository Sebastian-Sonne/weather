import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { SettingButton } from ".";
import { setLang } from "../../state/slices/settingsSlice";

const LanguageSettings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 xl:mx-auto">
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{lang === 'en' ? 'Language' : 'Sprache'}</h3>

            <div className="flex flex-row bg-bg-l">
                <SettingButton value={lang === 'en' ? 'English' : 'Englisch'} location="left" selected={lang === 'en'} onClick={() => dispatch(setLang('en'))} />
                <SettingButton value={lang === 'en' ? 'German' : 'Deutsch'} location="right" selected={lang === 'de'} onClick={() => dispatch(setLang('de'))} />
            </div>
        </div>
    );
}

export default LanguageSettings