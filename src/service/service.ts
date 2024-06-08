import { ForecastData, setForecast } from "../state/slices/forecastSlice";
import { CityData, setCity } from "../state/slices/citySlice"
import { WeatherData, setWeather } from "../state/slices/weatherSlice";
import getCities, { getCitiesByCoordinates } from "./geocode"
import getCurrentWeather, { getForecast } from "./weather";
import * as storage from './localStorage';
import { Dispatch } from "redux";
import { setPosition } from "../state/slices/mapSlice";
import { setLoading } from "../state/slices/loadingSlice";

export interface Data {
    cityData: CityData;
    currentWeather: WeatherData;
    forecast: ForecastData;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

const getData = async (queryOrCoordinates: string | Coordinates): Promise<Data> => {
    const unit = storage.getUnit();
    let citiesData: CityData[];

    if (typeof queryOrCoordinates === 'string') {
        citiesData = await getCities(queryOrCoordinates);
    } else {
        citiesData = await getCitiesByCoordinates(queryOrCoordinates.lon, queryOrCoordinates.lat);
    }

    if (citiesData.length === 0) throw new Error('Failed to fetch city data');

    const cityData: CityData = citiesData[0];

    const currentWeather = await getCurrentWeather(cityData.lon.toString(), cityData.lat.toString(), unit);
    const forecast = await getForecast(cityData.lon.toString(), cityData.lat.toString(), unit);

    return { cityData, currentWeather, forecast };
};

const getAndSaveData = async (queryOrCoordinates: string | Coordinates, dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));

        const data = await getData(queryOrCoordinates);
        const { cityData, currentWeather, forecast } = data;
        storage.setCoords({ lon: cityData.lon, lat: cityData.lat });

        dispatch(setCity(cityData));
        dispatch(setWeather(currentWeather));
        dispatch(setForecast(forecast));
        dispatch(setPosition([cityData.lat, cityData.lon]));

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
        throw error;
    }
}
export default getAndSaveData