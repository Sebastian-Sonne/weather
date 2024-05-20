import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { getDailyForecast } from "../../service/weather";
import { HourlyData } from "../../state/slices/forecastSlice";

const Forecast5Day = (): JSX.Element => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const forecast = useSelector((state: RootState) => state.forecast.value);
    const dailyData = getDailyForecast(forecast);

    //calc future day names
    const dayNames: string[] = [];
    const day = new Date().getDay();
    for (var i = 0; i < dailyData.length; i++) {
        dayNames.push(matchDay((day + i) % 7));
    }
    
    function matchDay(dayNumber: number): string {
        switch (dayNumber) {
            case 0:
                return lang === 'en' ? 'Sun' : 'So'
                break;
            case 1:
                return lang === 'en' ? 'Mon' : 'Mo'
                break;
            case 2:
                return lang === 'en' ? 'Tue' : 'Di'
                break;
            case 3:
                return lang === 'en' ? 'Wed' : 'Mi'
                break;
            case 4:
                return lang === 'en' ? 'Thu' : 'Do'
                break;
            case 5:
                return lang === 'en' ? 'Fri' : 'Fr'
                break;
            case 6:
                return lang === 'en' ? 'Sat' : 'Sa'
                break;
            default:
                return 'NA'
        }
    }

    return (
        <div className="w-full h-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d">{lang === 'en' ? '5-DAY FORECAST' : '5-TAGE-VORHERSAGE'}</h2>

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
export default Forecast5Day

interface DayOverviewProps {
    isFirst?: boolean,
    isLast?: boolean,
    data: HourlyData,
    day: string
};

export const DayOverview: React.FC<DayOverviewProps> = (props): JSX.Element => {
    const { isFirst = false, isLast = false, data, day } = props;

    const description = data.weather[0].main;
    const { temp } = data.main;
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    const classes = `flex flex-row justify-between items-center h-full min-h-[100px] px-4 border border-accent-l dark:border-accent-d border-x-0 ${isFirst ? 'border-t-0' : ''} ${isLast ? 'border-b-0' : ''}`

    return (
        <div className={classes}>
            <h4 className="font-medium text-secondary-l dark:text-secondary-d w-11">{day}</h4>

            <div className="flex flex-row items-center justify-left w-36 gap-4">
                <div className="h-14 aspect-square m-4 rounded-xl bg-icon dark:bg-accent-l">
                    <img src={iconURL} alt="Condition Icon" />
                </div>
                <h5 className="font-bold text-primary-l dark:text-primary-d">{description}</h5>
            </div>

            <h4 className="flex justify-end font-semibold text-primary-l dark:text-primary-d w-16">
                {temp.toFixed()}° {/*<span className="text-secondary-l dark:text-secondary-d">/{temp_min.toFixed()}</span>*/}
            </h4>
        </div>
    );
}