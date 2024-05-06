import Header from "./Header";
import { AirCondition, Forecast7Day, ForecastToday, Overview } from "./Weather";

const MainContent = (): JSX.Element => {

    return (
        <div className="flex flex-col w-full gap-6 max-w-[2000px]">
            <Header />
            <WeatherContent />
        </div>
    );
}
export default MainContent


export const WeatherContent = (): JSX.Element => {
    return (
        <div className='flex flex-col lg:flex-row w-full gap-6'>

            <WeatherToday />

            <Weather7Day />

        </div>
    );
}

export const WeatherToday = (): JSX.Element => {

    return (
        <div className='flex flex-col w-full lg:w-2/3 gap-4'>
            <Overview />
            <ForecastToday />
            <AirCondition />
        </div>
    );
}

export const Weather7Day = (): JSX.Element => {

    return (
        <div className='flex flex-col w-full lg:w-1/3'>
            <Forecast7Day />
        </div>
    );
}

export const Footer = (): JSX.Element => {
    return (
        <div className='flex justify-center align-middle w-full h-6 my-2'>
            <p className='text-secondary-l dark:text-secondary-d font-semibold'>&copy; {new Date().getFullYear()}
                <a href='https://github.com/sebastian-sonne' className='dark:text-slate-400 dark:hover:text-white text-gray-600 hover:text-gray-800 transition-colors' target='_blank'> Sebastian Sonne</a>
            </p>
        </div>
    );
}