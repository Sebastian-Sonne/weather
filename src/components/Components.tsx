import Header from "./Header";
import { SettingsIcon } from "./Settings";
import { AirCondition, Forecast5Day, ForecastToday, Overview } from "./Weather";

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
            <WeatherSettingsContainer />
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

export const WeatherSettingsContainer = (): JSX.Element => {

    return (
        <div className='flex flex-col gap-4 w-full lg:w-1/3'>
            <Forecast5Day />

            <div className="flex flex-row space-between w-full">

                <Footer />
                <SettingsIcon />
            </div>
        </div>
    );
}

export const Footer = (): JSX.Element => {
    return (
        <div className='flex items-center justify-center bg-component-light dark:bg-component-dark w-full h-12 rounded-xl'>
            <p className='text-secondary-l dark:text-secondary-d font-semibold'>&copy; {new Date().getFullYear()}
                <a href='https://github.com/sebastian-sonne' className='dark:text-slate-400 dark:hover:text-white text-gray-600 hover:text-gray-800 transition-colors' target='_blank'> Sebastian Sonne</a>
            </p>
        </div>
    );
}