import { ForecastData, HourlyData } from "../state/slices/forecastSlice";
import { WeatherData } from "../state/slices/weatherSlice";

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getCurrentWeather = async (lon: string, lat: string, unit: string): Promise<WeatherData> => {

    const url = new URL(BASE_URL + '/weather');
    //@ts-ignore
    url.search = new URLSearchParams({ lon: lon, lat: lat, units: unit, appid: API_KEY }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch current weather: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch current weather');
    }
}

export default getCurrentWeather

export const getForecast = async (lon: string, lat: string, unit: string): Promise<ForecastData> => {

    const url = new URL(BASE_URL + '/forecast');
    //@ts-ignore
    url.search = new URLSearchParams({ lon: lon, lat: lat, units: unit, appid: API_KEY }).toString();

    try {
        const response = await fetch(url);
        
        if (!response.ok)
            throw new Error(`Failed to fetch weather forecast: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch weather forecast');
    }
}

export const getDailyForecast = (forecast: ForecastData): HourlyData[] => {
    const dailyData: HourlyData[] = [];

    forecast.list.forEach((data: HourlyData) => {
        const date = new Date(data.dt * 1000);
        const hour = date.getHours();

        if (hour === 13 && date >= new Date()) {
            dailyData.push(data);
        }
    });

    return dailyData;
}