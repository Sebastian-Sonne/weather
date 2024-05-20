import { Footer } from "./Footer";
import { SettingsIcon } from "../settings/Settings";
import { AirCondition } from "./AirCondition";
import { Forecast5Day } from "./Forecast5Day";
import { ForecastToday } from "./ForecastToday";
import { Overview } from "./Overview";

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