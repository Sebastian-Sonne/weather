import { CityData } from "../state/slices/citySlice"
import { WeatherData } from "../state/slices/weatherSlice";
import getCities from "./geocode"
import getWeather from "./weather";

export interface Data {
    cityData: CityData;
    weatherData: WeatherData;
}

const getData = async (query: string): Promise<Data> => {
    const unit = localStorage.unit;

    const citiesData: CityData[] = await getCities(query);
    const cityData: CityData = citiesData[0];

    const { lon, lat } = cityData;
    const weatherData: WeatherData = await getWeather(lon.toString(), lat.toString(), unit);

    return { cityData, weatherData };
}

export default getData