import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import ThemeSettings from "./Theme";
import UnitSettings from "./Unit";
import LanguageSettings from "./Language";
import TimeSettings from "./Time";

const Settings = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7 max-w-[2000px]">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-2">{lang === 'en' ? 'SETTINGS' : 'EINSTELLUNGEN'}</h2>

            <div className="flex flex-col xl:flex-row xl:justify-between w-full p-2 gap-4">
                <SettingsContainer components={[UnitSettings, TimeSettings]} />
                <SettingsContainer components={[LanguageSettings, ThemeSettings]} />
            </div>
        </div>
    );
}
export default Settings

interface SettingsContainerProps {
    components: React.ComponentType[];
}
export const SettingsContainer: React.FC<SettingsContainerProps> = ({components}): JSX.Element => {
    return (
        <div className="flex flex-col sm:flex-row justify-between xl:justify-start xl:gap-4 xl:w-full gap-2">
            {components.map((Componet, index) => (
                <Componet key={index} />
            ))}
        </div>
    );
}