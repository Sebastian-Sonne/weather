import React from "react";
import { Cloud, Rain, Snow, Sun } from "./Icons";


export const Forecast7Day = () => {

    return (
        <div className="w-full h-[250px] lg:h-full bg-slate-400 rounded-2xl">

        </div>
    );
}

export const Overview = () => {

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

            <div className="flex items-center h-full aspect-square p-4">
                <Sun />
            </div>
        </div>
    );
}

export const ForecastToday = () => {
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

export const HourOverview: React.FC<HourOverviewProps> = ({ isFirst, isLast}) => {

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


export const AirCondition = () => {

    return (
        <div className="w-full h-[250px] bg-slate-600 rounded-2xl p-5">

            <h2 className="font-semibold text-sm text-gray-300 mb-4">AIR CONDITION</h2>

        </div>
    );
}