import React from "react";
import { DropIcon, Sun, SunIcon, ThermometerIcon, WindIcon } from "./Icons";
import { Footer } from "./Components";

export const Overview = (): JSX.Element => {

    return (
        <div className="flex flex-row w-full h-[200px] sm:h-[300px] sm:p-4 rounded-2xl overflow-x-hidden">
            <div className="flex flex-col w-1/2 md:w-2/3 mr-auto py-4 px-2 lg:px-6">

                <div className="h-full gap-4">
                    <h1 className="font-bold text-white text-5xl mb-2">Madrid</h1>
                    <h2 className="font-medium text-gray-300">Chance of rain: 31%</h2>
                </div>

                <div className="pb-2">
                    <h2 className="font-bold text-white text-6xl">31°</h2>
                </div>

            </div>

            <div className="flex items-center h-full aspect-square py-4 px-6">
                <Sun />
            </div>
        </div>
    );
}

export const ForecastToday = (): JSX.Element => {
    const weatherList = ['', '', '', '', '', '']

    return (
        <div className="w-full bg-bg-secondary rounded-2xl p-6 pt-7">
            <h2 className="font-semibold text-sm text-gray-300 mb-4">TODAY'S FORECAST</h2>
    
            <div className="overflow-x-auto">
                <table className="table mb-2">
                    <tbody>
                        <tr className="flex flex-row min-w-[568px]">
                            {weatherList.map((_, index) => (
                                <HourOverview
                                    key={index}
                                    isFirst={index === 0}
                                    isLast={index === weatherList.length - 1}
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
    isLast: boolean
}
export const HourOverview: React.FC<HourOverviewProps> = ({ isFirst, isLast }): JSX.Element => {

    const classes = `flex flex-col gap-2 items-center border border-y-0 border-gray-500 ${isFirst ? 'border-l-0' : ''} ${isLast ? 'border-r-0' : ''}`;

    return (
        <td className={classes}>
            <h3 className="font-bold text-lg text-gray-400">00:00</h3>
            <div className="w-1/3">
                <Sun />
            </div>
            <h3 className="font-bold text-3xl text-gray-300">00°</h3>
        </td>
    );
}

export const AirCondition = (): JSX.Element => {

    return (
        <div className="w-full bg-bg-secondary rounded-2xl p-6 pt-7">

            <h2 className="font-semibold text-sm text-gray-300 mb-4">AIR CONDITION</h2>

            <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 mb-2">
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name="Real Feel" value={30} unit="°" icon={<ThermometerIcon />} />
                    <ConditionElement name="Chance of rain" value={2} unit="%" icon={<DropIcon />} />
                </div>
                <div className="flex flex-col gap-4 w-full xs:w-1/2">
                    <ConditionElement name="Wind" value={12} unit="km/h" icon={<WindIcon />} />
                    <ConditionElement name="UV Index" value={5} unit="" icon={<SunIcon />} />
                </div>
            </div>
        </div>
    );
}

interface ConditionElementProps {
    name: string,
    value: number,
    unit: string,
    icon: JSX.Element
};
export const ConditionElement: React.FC<ConditionElementProps> = (props): JSX.Element => {

    return (
        <div className="flex flex-row w-full">
            <div className="w-8 aspect-square pt-1 px-1">
                {props.icon}
            </div>
            <div className="flex flex-col px-2">
                <h4 className="font-semibold text-lg text-gray-400">{props.name}</h4>
                <h3 className="font-bold text-3xl text-gray-300">{props.value}{props.unit}</h3>
            </div>
        </div>
    );
}

export const Forecast7Day = (): JSX.Element => {

    return (
        <div className="w-full lg:h-full bg-bg-secondary rounded-2xl p-6 pt-7">

            <h2 className="font-semibold text-sm text-gray-300 mb-4">7-DAY FORECAST</h2>

            <div className="flex flex-col">
                <DayOverview day="Today" isFirst={true} />
                <DayOverview day="Tue"  />
                <DayOverview day="Wed"  />
                <DayOverview day="Thu"  />
                <DayOverview day="Fri"  />
                <DayOverview day="Sat"  />
                <DayOverview day="Sun"  isLast={true} />
            </div>

            <Footer />

        </div>
    );
}

interface DayOverviewProps {
    isFirst?: boolean,
    isLast?: boolean,
    day: string
};

export const DayOverview: React.FC<DayOverviewProps> = (props): JSX.Element => {

    const { isFirst = false, isLast = false } = props;

    const classes = `flex flex-row justify-between items-center h-24 px-4 border border-gray-500 border-x-0 ${isFirst ? 'border-t-0' : ''} ${isLast ? 'border-b-0' : ''}`

    return (
        <div className={classes}>
            <h4 className="font-semibold text-gray-400 w-11">{props.day}</h4>

            <div className="flex flex-row items-center gap-4">
                <div className="h-10 aspect-square">
                    <Sun />
                </div>
                <h5 className="font-bold text-white">Sunny</h5>
            </div>

            <h4 className="font-semibold text-white">00<span className="text-gray-400">/00</span></h4>
        </div>
    );
}