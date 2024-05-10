import { ForecastData } from "../state/slices/ForecastSlice";
import { CityData } from "../state/slices/citySlice"
import { WeatherData } from "../state/slices/weatherSlice";
import getCities from "./geocode"
import getCurrentWeather, { getForecast } from "./weather";


export interface Data {
    cityData: CityData;
    currentWeather: WeatherData;
    forecast: ForecastData;
}

const getData = async (query: string): Promise<Data> => {
    const unit = localStorage.unit;

    const citiesData: CityData[] = await getCities(query);
    const cityData: CityData = citiesData[0];

    const { lon, lat } = cityData;
    const currentWeather = await getCurrentWeather(lon.toString(), lat.toString(), unit);
    const forecast = await getForecast(lon.toString(), lat.toString(), unit);

    return { cityData, currentWeather, forecast };
}

export default getData