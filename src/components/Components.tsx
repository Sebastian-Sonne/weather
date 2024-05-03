import Header from "./Header";
import { AirCondition, Forecast7Day, ForecastToday, Overview } from "./Weather";

const MainContent = () => {

    return (
        <div className="flex flex-col w-full gap-6 max-w-[2000px]">
            <Header />
            <WeatherContent />
        </div>
    );
}
export default MainContent


export const WeatherContent = () => {
    return (
        <div className='flex flex-col lg:flex-row w-full gap-6'>

            <WeatherToday />

            <Weather7Day />

        </div>
    );
}

export const WeatherToday = () => {

    return (
        <div className='flex flex-col w-full lg:w-2/3 gap-4'>
            <Overview />
            <ForecastToday />
            <AirCondition />
        </div>
    );
}

export const Weather7Day = () => {

    return (
        <div className='flex flex-col w-full lg:w-1/3'>
            <Forecast7Day />
        </div>
    );
}