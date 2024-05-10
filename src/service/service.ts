import { ForecastData } from "../state/slices/forecastSlice";
import { CityData } from "../state/slices/citySlice"
import { WeatherData } from "../state/slices/weatherSlice";
import getCities, { getCitiesByCoordinates } from "./geocode"
import getCurrentWeather, { getForecast } from "./weather";


export interface Data {
    cityData: CityData;
    currentWeather: WeatherData;
    forecast: ForecastData;
}

interface Coordinates {
    lon: number;
    lat: number;
}

const getData = async (queryOrCoordinates: string | Coordinates): Promise<Data> => {
    const unit = localStorage.unit;

    let citiesData: CityData[];

    if (typeof queryOrCoordinates === 'string') {
        citiesData = await getCities(queryOrCoordinates);
    } else {
        citiesData = await getCitiesByCoordinates(queryOrCoordinates.lon, queryOrCoordinates.lat);
    }

    const cityData: CityData = citiesData[0];

    const currentWeather = await getCurrentWeather(cityData.lon.toString(), cityData.lat.toString(), unit);
    const forecast = await getForecast(cityData.lon.toString(), cityData.lat.toString(), unit);

    return { cityData, currentWeather, forecast };
};

export default getData;
