import React from "react";
import { Cloud, DropIcon, Rain, Snow, Sun, SunIcon, ThermometerIcon, WindIcon } from "./Icons";

export const Overview = (): JSX.Element => {

    return (
        <div className="flex flex-row w-full h-[300px] p-4 rounded-2xl">
            <div className="flex flex-col w-1/2 md:w-2/3 mr-auto py-4 px-6">
                <div className="h-full gap-4">
                    <h1 className="font-bold text-5xl mb-2">Madrid</h1>
                    <h2 className="font-medium text-gray-300">Chance of rain: 31%</h2>
                </div>

                <div className="pb-2">
                    <h2 className="font-bold text-6xl">31°</h2>
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
        <div className="w-full bg-slate-600 rounded-2xl p-5">
            <h2 className="font-semibold text-sm text-gray-300 mb-4">TODAY'S FORECAST</h2>

            <table className="table mb-2">
                <tbody>
                    <tr className="flex flex-row">
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
            <h3 className="font-bold text-sm text-gray-300">00:00</h3>
            <div className="w-1/2">
                <Sun />
            </div>
            <h3 className="font-bold text-sm text-gray-300">00°</h3>
        </td>
    );
}

export const AirCondition = (): JSX.Element => {

    return (
        <div className="w-full bg-slate-600 rounded-2xl p-5">

            <h2 className="font-semibold text-sm text-gray-300 mb-4">AIR CONDITION</h2>

            <div className="flex flex-row gap-6 mb-2">
                <div className="flex flex-col gap-2 w-1/2">
                    <ConditionElement name="Real Feel" value={30} unit="°" icon={<ThermometerIcon />} />
                    <ConditionElement name="Chance of rain" value={2} unit="%" icon={<DropIcon />} />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
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
        <div className="w-full h-[250px] lg:h-full bg-slate-400 rounded-2xl">

        </div>
    );
}