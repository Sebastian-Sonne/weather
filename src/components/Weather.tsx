import React from "react";
import { DropIconLight, PressureIconLight, ThermometerIconLight, WindIconLight } from "./Icons";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { HourlyData } from "../state/slices/forecastSlice";
import moment from "moment-timezone";
import { getDailyForecast } from "../service/weather";

export const Overview = (): JSX.Element => {

    const city = useSelector((state: RootState) => state.city.value);
    const weather = useSelector((state: RootState) => state.weather.value);

    return (
        <div className="flex flex-row w-full h-[200px] sm:h-[300px] sm:p-4 rounded-2xl overflow-x-hidden">
            <div className="flex flex-col w-1/2 md:w-2/3 mr-auto py-4 px-2 lg:px-6">

                <div className="h-full gap-4">
                    <h1 className="font-bold text-primary-l dark:text-primary-d text-5xl mb-2">
                        <span className="truncate">
                            {city.local_names === undefined ? city.name : (city.local_names.de !== undefined) ? city.local_names.de : city.name}
                            <span className="font-bold text-secondary-l dark:text-secondary-d text-2xl">
                                , {city.country}
                            </span>
                        </span>
                    </h1>
                    <h2 className="font-semibold text-secondary-l dark:text-secondary-d">{weather.weather[0].description}</h2>
                </div>

                <div className="pb-2">
                    <h2 className="font-bold dark:text-primary-d text-7xl">{parseFloat(weather.main.temp).toFixed()}°</h2>
                </div>

            </div>

            <div className="flex items-center h-full aspect-square py-4 px-6">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather icon" />
            </div>
        </div>
    );
}

export const ForecastToday = (): JSX.Element => {

    const forecast = useSelector((state: RootState) => state.forecast.value);
    const firstForecast = forecast.list.slice(0, 6);

    return (
        <div className="w-full component-light bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-4">TODAY'S FORECAST</h2>

            <div className="overflow-x-auto">
                <table className="table mb-2">
                    <tbody>
                        <tr className="flex flex-row min-w-[568px]">
                            {firstForecast.map((data, index) => (
                                <HourOverview
                                    key={index}
                                    isFirst={index === 0}
                                    isLast={index === firstForecast.length - 1}
                                    data={data}
                                    offSet={forecast.city.timezone}
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
    isFirst?: boolean;
    isLast?: boolean;
    data: HourlyData;
    offSet: number;
}

export const HourOverview: React.FC<HourOverviewProps> = ({ isFirst, isLast, data, offSet }): JSX.Element => {

    //convert time to correct offset
    const timeString = convertUnixToLocal(data.dt, offSet);
    const time = timeString.split(' ')[1].split(':')[0];

    const temp = data.main.temp.toFixed();
    const icon = data.weather[0].icon;

    const classes = `flex flex-col gap-2 items-center border border-secondary-l dark:border-secondary-d border-y-0 ${isFirst ? 'border-l-0' : ''} ${isLast ? 'border-r-0' : ''}`;

    return (
        <td className={classes}>
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{time}:00</h3>
            <div className="w-2/3 md:w-1/3 rounded-xl bg-gray-300 dark:bg-accent-l">
                <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather icon" />
            </div>
            <h3 className="font-semibold text-3xl text-primary-l dark:text-primary-d">{temp}°</h3>
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
                    <ConditionElement name="Real Feel" value={parseFloat(weather.main.feels_like).toFixed()} unit="°" icon={<ThermometerIconLight />} />
                    <ConditionElement name="Humidity" value={parseFloat(weather.main.humidity).toFixed()} unit="%" icon={<DropIconLight />} />
                </div>
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name="Wind" value={parseFloat(weather.wind.speed).toFixed()} unit="km/h" icon={<WindIconLight />} />
                    <ConditionElement name="Pressure" value={weather.main.pressure} unit="hPa" icon={<PressureIconLight />} />
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
                <h3 className="font-bold text-3xl text-primary-l dark:text-primary-d">{props.value}{props.unit}</h3>
            </div>
        </div>
    );
}

export const Forecast7Day = (): JSX.Element => {
    const forecast = useSelector((state: RootState) => state.forecast.value);
    const dailyData = getDailyForecast(forecast);

    //calc future day names
    const dayNames: string[] = [];
    const day = new Date().getDay();
    for (var i = 0; i < dailyData.length; i++) {
        dayNames.push(matchDay(day + i % 7));
    }

    function matchDay(dayNumber: number): string {
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
        <div className="w-full h-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d">5-DAY FORECAST</h2>

            <div className="flex flex-col h-full">
                {dailyData.map((data, index) => (
                    <DayOverview
                        key={index}
                        data={data}
                        day={dayNames[index]}
                        isFirst={index === 0}
                        isLast={index === dailyData.length - 1} />
                ))}
            </div>
        </div>
    );
}

interface DayOverviewProps {
    isFirst?: boolean,
    isLast?: boolean,
    data: HourlyData,
    day: string
};

export const DayOverview: React.FC<DayOverviewProps> = (props): JSX.Element => {
    const { isFirst = false, isLast = false, data, day } = props;

    const description = data.weather[0].main;
    const { temp_min: minTemp, temp_max: maxTemp } = data.main;
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    const classes = `flex flex-row justify-between items-center h-full min-h-[100px] px-4 border border-accent-l dark:border-accent-d border-x-0 ${isFirst ? 'border-t-0' : ''} ${isLast ? 'border-b-0' : ''}`

    return (
        <div className={classes}>
            <h4 className="font-medium text-secondary-l dark:text-secondary-d w-11">{day}</h4>

            <div className="flex flex-row items-center justify-left w-36 gap-4">
                <div className="h-14 aspect-square m-4 rounded-xl bg-gray-300 dark:bg-accent-l">
                    <img src={iconURL} alt="Condition Icon" />
                </div>
                <h5 className="font-bold text-primary-l dark:text-primary-d">{description}</h5>
            </div>

            <h4 className="flex justify-end font-semibold text-primary-l dark:text-primary-d w-16">
                {minTemp.toFixed()}<span className="text-secondary-l dark:text-secondary-d">/{maxTemp.toFixed()}</span>
            </h4>
        </div>
    );
}

/**
 * function to convert Unix timestamp to Local time with timezone offset
 * @param unixTimestamp 
 * @param timezoneOffset 
 * @returns timestring YYYY-MM-DD HH:mm:s
 */
const convertUnixToLocal = (unixTimestamp: number, timezoneOffset: number): string => {
    const utcMoment = moment.unix(unixTimestamp);
    const localMoment = utcMoment.clone().utcOffset(timezoneOffset / 60);
    return localMoment.format('YYYY-MM-DD HH:mm:ss');
}