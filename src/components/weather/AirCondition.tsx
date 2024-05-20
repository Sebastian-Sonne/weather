import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { DropIconLight, PressureIconLight, ThermometerIconLight, WindIconLight } from "../Icons";

export const AirCondition = (): JSX.Element => {
    const weather = useSelector((state: RootState) => state.weather.value);
    const unit = useSelector((state: RootState) => state.settings.unit);
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">

            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-4">{lang === 'en' ? 'AIR CONDITION' : 'LUFT DATEN'}</h2>

            <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 mb-2">
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name={lang === 'en' ? 'Real Feel' : 'Gefühlt'} value={parseFloat(weather.main.feels_like).toFixed()} unit="°" icon={<ThermometerIconLight />} />
                    <ConditionElement name={lang === 'en' ? 'Humidity' : 'Feuchtigkeit'} value={parseFloat(weather.main.humidity).toFixed()} unit="%" icon={<DropIconLight />} />
                </div>
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name="Wind" value={parseFloat(weather.wind.speed).toFixed()} unit={unit === 'imperial' ? 'mp/h' : 'm/s'} icon={<WindIconLight />} />
                    <ConditionElement name={lang === 'en' ? 'Pressure' : 'Luftdruck'} value={weather.main.pressure} unit="hPa" icon={<PressureIconLight />} />
                </div>
            </div>
        </div>
    );
}

interface ConditionElementProps {
    name: string,
    value: string | number,
    unit: string,
    icon: JSX.Element
};
export const ConditionElement: React.FC<ConditionElementProps> = (props): JSX.Element => {

    return (
        <div className="flex flex-row w-full">
            <div className="w-8 aspect-square pt-1 px-1 text-primary-l dark:text-primary-d">
                {props.icon}
            </div>
            <div className="flex flex-col px-2">
                <h4 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{props.name}</h4>
                <h3 className="font-bold text-3xl text-primary-l dark:text-primary-d">{props.value}
                <span className={`font-bold ${props.unit === '°' ? 'text-3xl' : 'text-xl'} text-secondary-l dark:text-secondary-d`}>{props.unit}</span>
                </h3>
            </div>
        </div>
    );
}