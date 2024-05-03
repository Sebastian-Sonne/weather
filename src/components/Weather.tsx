import { Sun } from "./Icons";


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

    return (
        <div className="w-full h-[250px] bg-slate-400 rounded-2xl">

        </div>
    );
}

export const AirCondition = () => {

    return (
        <div className="w-full h-[250px] bg-slate-400 rounded-2xl">

        </div>
    );
}