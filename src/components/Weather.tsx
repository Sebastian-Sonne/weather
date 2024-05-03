import { Cloud, Rain, Snow, Sun } from "./Icons";


export const Forecast7Day = () => {

    return (
        <div className="w-full h-[250px] lg:h-full bg-slate-400 rounded-2xl">

        </div>
    );
}

export const Overview = () => {

    return (
        <div className="flex flex-row w-full h-[250px] p-4 rounded-2xl">
            <div className="flex flex-col w-2/3 py-4 px-6">
                <div className="h-full gap-4">
                    <h1 className="font-bold text-5xl mb-2">Madrid</h1>
                    <h2 className="font-medium text-gray-300">Chance of rain: 31%</h2>
                </div>

                <div className="h-1/3">
                    <h2 className="font-bold text-6xl">31°</h2>
                </div>
            </div>

            <div className="w-1/3 p-4">
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

            <table className="table">
                <tbody>
                    <tr className="flex flex-row">
                        {weatherList.map((_, index) => (
                            <HourOverview key={index} />
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export const HourOverview = () => {

    return (
        <td className="flex flex-col gap-2 items-center w-1/6">
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