import { useSelector } from "react-redux";
import Header from "./Header";
import { AirCondition, Forecast7Day, ForecastToday, Overview } from "./Weather";
import { RootState } from "../state/store";
import { SettingsIconDark, SettingsIconLight } from "./Icons";

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
            <Forecast7Day />

            <div className="flex flex-row space-between w-full">
                <Footer />
                <Settings />
            </div>
        </div>
    );
}

export const Settings = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);

    const handleClick = () => {
        //! open settings
    }

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            <button onClick={handleClick} className="w-full aspect-square p-2 rounded-xl">
                {theme === 'dark' ? <SettingsIconDark /> : <SettingsIconLight />}
            </button>
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