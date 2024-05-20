import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { HourlyData } from "../../state/slices/forecastSlice";
import moment from "moment";

export const ForecastToday = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const forecast = useSelector((state: RootState) => state.forecast.value);
    const firstForecast = forecast.list.slice(0, 6);

    return (
        <div className="w-full component-light bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-4">{lang === 'en' ? 'TODAY\'S FORECAST' : 'TAGES VORHERSAGE'}</h2>

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
    const timeType = useSelector((state: RootState) => state.settings.time);
    const timeString = convertUnixToLocal(data.dt, offSet);
    const hourTime = parseInt(timeString.split(' ')[1].split(':')[0]);

    const getTime = () => {
        const prefix = hourTime < 12 ? 'AM' : 'PM';
        return `${timeType == 12 ? hourTime % 12 : hourTime}:00 ${timeType == 12 ? prefix : ''}`;
    }

    const temp = data.main.temp.toFixed();
    const icon = data.weather[0].icon;

    const classes = `flex flex-col gap-2 items-center border border-secondary-l dark:border-secondary-d border-y-0 ${isFirst ? 'border-l-0' : ''} ${isLast ? 'border-r-0' : ''}`;

    return (
        <td className={classes}>
            <h3 className="font-semibold text-lg text-secondary-l dark:text-secondary-d">{getTime()}</h3>
            <div className="w-2/3 md:w-1/3 rounded-xl bg-icon dark:bg-accent-l">
                <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather icon" />
            </div>
            <h3 className="font-semibold text-3xl text-primary-l dark:text-primary-d">{temp}°</h3>
        </td>
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