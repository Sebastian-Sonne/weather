import React from "react";
import { DropIcon, Sun, SunIcon, ThermometerIcon, WindIcon } from "./Icons";
import { Footer } from "./Components";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export const Overview = (): JSX.Element => {

    const city = useSelector((state: RootState) => state.city.value);
    const weather = useSelector((state: RootState) => state.weather.value);

    return (
        <div className="flex flex-row w-full h-[200px] sm:h-[300px] sm:p-4 rounded-2xl overflow-x-hidden">
            <div className="flex flex-col w-1/2 md:w-2/3 mr-auto py-4 px-2 lg:px-6">

                <div className="h-full gap-4">
                    <h1 className="font-bold text-primary-l dark:text-primary-d text-5xl mb-2">
                        {city.local_names === undefined ? city.name : (city.local_names.de !== undefined) ? city.local_names.de : city.name}
                        <span className="font-bold text-secondary-l dark:text-secondary-d text-2xl">, {city.country}</span>
                    </h1>
                    <h2 className="font-semibold text-secondary-l dark:text-secondary-d">{weather.weather[0].description}</h2>
                </div>

                <div className="pb-2">
                    <h2 className="font-bold dark:text-primary-d text-7xl">{parseFloat(weather.main.temp).toFixed()}°</h2>
                </div>

            </div>

            <div className="flex items-center h-full aspect-square py-4 px-6">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="test weather !!!" />
            </div>

            {/*! ICONS !!!
             * 
            <div className="flex items-center h-full aspect-square py-4 px-6">
                <Sun />
            </div>

            */}
        </div>
    );
}

interface Weather {
    time: Date | string,
    temperature: number | string,
}

interface WeatherArray extends Array<Weather> { }

export const ForecastToday = (): JSX.Element => {

    const weather = useSelector((state: RootState) => state.weather);
    const date = new Date();

    const weatherList: WeatherArray = [{ time: 'Now', temperature: parseFloat(weather.value.main.temp).toFixed() }, { time: date, temperature: '-' }, { time: date, temperature: '-' }, { time: date, temperature: '-' }, { time: date, temperature: '-' }, { time: date, temperature: '-' }];

    return (
        <div className="w-full component-light bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-4">TODAY'S FORECAST</h2>

            <div className="overflow-x-auto">
                <table className="table mb-2">
                    <tbody>
                        <tr className="flex flex-row min-w-[568px]">
                            {weatherList.map((data, index) => (
                                <HourOverview
                                    key={index}
                                    isFirst={index === 0}
                                    isLast={index === weatherList.length - 1}
                                    time={data.time}
                                    temperature={data.temperature}
                                    index={index}
                                />
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

}

interface HourOverviewProps {
    isFirst: boolean,
    isLast: boolean,
    time: Date | string,
    temperature: number | string,
    index: number,
}
export const HourOverview: React.FC<HourOverviewProps> = ({ isFirst, isLast, time, temperature, index }): JSX.Element => {

    const classes = `flex flex-col gap-2 items-center border border-y-0 border-gray-500 ${isFirst ? 'border-l-0' : ''} ${isLast ? 'border-r-0' : ''}`;

    var currentTime
    if (typeof time !== 'string') {
        const timeParts = time.toTimeString().split(':');
        const hour = parseInt(timeParts[0])
        currentTime = `${hour + (index * 2)}:00`
    }

    return (
        <td className={classes}>
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{(typeof time === 'string') ? time : currentTime}</h3>
            <div className="w-1/3">
                <Sun />
            </div>
            <h3 className="font-semibold text-3xl text-primary-l dark:text-primary-d">{temperature}°</h3>
        </td>
    );
}

export const AirCondition = (): JSX.Element => {
    const weather = useSelector((state: RootState) => state.weather.value);

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">

            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-4">AIR CONDITION</h2>

            <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 mb-2">
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name="Real Feel" value={parseFloat(weather.main.feels_like).toFixed()} unit="°" icon={<ThermometerIcon />} />
                    <ConditionElement name="Chance of rain" value={'--'} unit="%" icon={<DropIcon />} />
                </div>
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name="Wind" value={parseFloat(weather.wind.speed).toFixed()} unit="km/h" icon={<WindIcon />} />
                    <ConditionElement name="UV Index" value={'--'} unit="" icon={<SunIcon />} />
                </div>
            </div>
        </div>
    );
}

interface ConditionElementProps {
    name: string,
    value: string,
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
                <h3 className="font-bold text-3xl text-primary-l dark:text-primary-d">{props.value}{props.unit}</h3>
            </div>
        </div>
    );
}

export const Forecast7Day = (): JSX.Element => {

    const weather = useSelector((state: RootState) => state.weather)

    const day = new Date().getDay();
    const matchDay = (dayNumber: number): string => {
        switch (dayNumber) {
            case 0:
                return 'Sun'
                break;
            case 1:
                return 'Mon'
                break;
            case 2:
                return 'Tue'
                break;
            case 3:
                return 'Wed'
                break;
            case 4:
                return 'Thu'
                break;
            case 5:
                return 'Fri'
                break;
            case 6:
                return 'Sat'
                break;
            default:
                return 'NA'
        }
    }

    return (
        <div className="w-full lg:h-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">

            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-4">7-DAY FORECAST</h2>

            <div className="flex flex-col">
                <DayOverview day="Today" weather={{ main: weather.value.weather[0].main, min: weather.value.main.temp_min, max: weather.value.main.temp_max }} isFirst={true} />
                <DayOverview day={matchDay((day + 1) % 7)} weather={{ main: '--', min: '--', max: '--' }} />
                <DayOverview day={matchDay((day + 2) % 7)} weather={{ main: '--', min: '--', max: '--' }} />
                <DayOverview day={matchDay((day + 3) % 7)} weather={{ main: '--', min: '--', max: '--' }} />
                <DayOverview day={matchDay((day + 4) % 7)} weather={{ main: '--', min: '--', max: '--' }} />
                <DayOverview day={matchDay((day + 5) % 7)} weather={{ main: '--', min: '--', max: '--' }} />
                <DayOverview day={matchDay((day + 6) % 7)} weather={{ main: '--', min: '--', max: '--' }} isLast={true} />
            </div>

            <Footer />

        </div>
    );
}

interface DayWeather {
    main: string,
    min: string,
    max: string,
}

interface DayOverviewProps {
    isFirst?: boolean,
    isLast?: boolean,
    day: string,
    weather: DayWeather
};

export const DayOverview: React.FC<DayOverviewProps> = (props): JSX.Element => {

    const { isFirst = false, isLast = false, weather, day } = props;

    const classes = `flex flex-row justify-between items-center h-24 px-4 border border-gray-500 border-x-0 ${isFirst ? 'border-t-0' : ''} ${isLast ? 'border-b-0' : ''}`

    return (
        <div className={classes}>
            <h4 className="font-medium text-secondary-l dark:text-secondary-d w-11">{day}</h4>

            <div className="flex flex-row items-center justify-center w-36 gap-4">
                <div className="h-10 aspect-square">
                    <Sun />
                </div>
                <h5 className="font-bold text-primary-l dark:text-primary-d">{weather.main}</h5>
            </div>

            <h4 className="flex justify-end font-semibold text-primary-l dark:text-primary-d w-16">
                {(weather.max !== '--') ? parseFloat(weather.max).toFixed() : '-'}<span className="text-secondary-l dark:text-secondary-d">/{(weather.min !== '--') ? parseFloat(weather.min).toFixed() : '-'}</span>
            </h4>
        </div>
    );
}