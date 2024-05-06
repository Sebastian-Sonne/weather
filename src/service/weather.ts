import { WeatherData } from "../state/slices/weatherSlice";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;


const getWeather = async (lon: string, lat: string): Promise<WeatherData> => {
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({ lon: lon, lat: lat, units:'metric', apikey: API_KEY }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch Weather Data: ${error}`);
    }
}

export default getWeather

